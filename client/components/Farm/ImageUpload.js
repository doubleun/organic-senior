//! BUG: Can't delete image, can only "replace" them

import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { BASE_URL } from '/constants'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function FarmImageUpload({
  userInfo,
  farmInfo,
  setShowImageUpload,
  setAlertSuccess,
}) {
  // Loading state
  const [loading, setLoading] = useState(false)
  const [uploadImages, setUploadImages] = useState([])
  const [selectedImage, setSelectedImage] = useState()

  // Fetch farm images first time loaded
  useEffect(() => {
    if (farmInfo?.farmImages) {
      for (let image of farmInfo.farmImages) {
        setUploadImages((prev) => [...prev, { file: 'none', preview: image }])
      }
    }
  }, [])

  // Function that run every time new image select
  useEffect(() => {
    // If no image selected this won't run
    if (!selectedImage || uploadImages.length === 3) {
      return
    }

    // create image preview
    const objectUrl = URL.createObjectURL(selectedImage)
    setUploadImages((prev) => [
      ...prev,
      { file: selectedImage, preview: objectUrl },
    ])

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedImage])

  // Handle upload to cloud and update the database
  const handleUploadImages = async (action, images) => {
    // Sets loading state to true
    setLoading(true)
    // If no image selected, stop the function
    if (!images) return

    // Filter alreay uploaded images
    const temp_arr = images.filter((img) => img.file !== 'none')
    // console.log(temp_arr);

    if (temp_arr.length === 0) return

    // Map and append all images
    const formData = new FormData()
    temp_arr.map((img) => {
      formData.append('image', img.file)
    })

    // Upload to cloudinary
    const res = await fetch(`${BASE_URL}/api/settings/upload-multiple`, {
      method: 'POST',
      body: formData,
    })
    const newImage = await res.json()
    // console.log(newImage);

    // Add existed images urls to newImage.image_urls array
    images.map((img) =>
      img.file === 'none' ? newImage.image_urls.push(img.preview) : null
    )

    // Update database
    const resUpdate = await fetch(`${BASE_URL}/api/settings/update-database`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        email: userInfo.email,
        farmImages: newImage.image_urls,
      }),
    })
    if (resUpdate.status === 200) {
      setAlertSuccess(true)
      setTimeout(() => setAlertSuccess(false), 6000)
      setShowImageUpload(false)
    }
    setLoading(false)
  }

  return (
    <div className="farmImageUploadModal">
      <h4>Upload farm images (up to 3 images)</h4>
      <p>Click the preview image to remove</p>
      <div className="farmPreviewImages">
        {uploadImages.map((img, index) => (
          <Image
            src={img.preview}
            id={img.preview}
            width="180px"
            height="100px"
            onClick={(e) => {
              setUploadImages((prev) =>
                prev.filter((prev_img) => prev_img.preview !== e.target.id)
              )
            }}
            key={index + img.preview}
          />
        ))}
      </div>

      <input
        className="form-control mb-2"
        accept=".jpg, .jpeg, .png"
        type="file"
        disabled={uploadImages.length === 3}
        onChange={(e) => {
          setSelectedImage(e.target.files[0])
          e.target.value = ''
        }}
      />

      {/* Buttons */}
      <div className="farmUploadImageButtons">
        <Button
          variant="secondary"
          // disabled={!selectedImage}
          onClick={() => setShowImageUpload(false)}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="success"
          disabled={uploadImages.length < 1 || loading}
          onClick={() => {
            handleUploadImages('farm-images', uploadImages)
          }}
        >
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              className="me-1"
            />
          ) : null}
          Confirm
        </Button>
      </div>
    </div>
  )
}
