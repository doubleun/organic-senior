import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function NewItemModal({
  setShowNewItmModal,
  setAlertSuccess,
  setFarmProductsUI,
}) {
  const productName = useRef();
  const productCategory = useRef();
  const productDesc = useRef();
  const productStockAmount = useRef();
  const productPrice = useRef();
  const [productInStock, setProductInStock] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  // Function that run every time new image select
  useEffect(() => {
    // If no image selected this won't run
    if (!selectedImage || uploadImages.length === 3) {
      return;
    }

    // create image preview
    const objectUrl = URL.createObjectURL(selectedImage);
    setUploadImages((prev) => [
      ...prev,
      { file: selectedImage, preview: objectUrl },
    ]);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  // Function for handling add new product
  const handleAddProduct = async (images) => {
    //* Upload images *//
    // If no image selected, stop the function
    if (!images || images.length === 0) return;

    // Map and append all images
    const formData = new FormData();
    images.map((img) => {
      formData.append("image", img.file);
    });

    // Upload to cloudinary
    const res = await fetch(
      "http://localhost:3000/api/settings/upload-multiple",
      {
        method: "POST",
        body: formData,
      }
    );
    if (res.status === 200) {
      // Get image urls
      const newImage = await res.json();

      // console.log(newImage.image_urls);

      // Update database
      const updateRes = await fetch(
        "http://localhost:3000/api/farm/add-product",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productName: productName.current.value,
            productPrice: parseInt(productPrice.current.value),
            productCategory: productCategory.current.value,
            productDesc: productDesc.current.value,
            productInStock,
            productStockAmount: parseInt(productStockAmount.current.value),
            productImages: newImage.image_urls,
          }),
        }
      );
      if (updateRes.status === 200) {
        // Show success alert
        setAlertSuccess(true);
        setTimeout(() => setAlertSuccess(false), 6000);
        console.log("Successfully added a new product");

        // Update UI
        setFarmProductsUI((prev) => [
          ...prev,
          {
            name: productName.current.value,
            price: parseInt(productPrice.current.value),
            category: productCategory.current.value,
            description: productDesc.current.value,
            inStock: productInStock,
            stockAmount: parseInt(productStockAmount.current.value),
            productImages: newImage.image_urls,
          },
        ]);

        // Close the modal
        setShowNewItmModal(false);
      }
    }
  };

  return (
    <div className="farmAddNewItemModal">
      <h3>Add new product</h3>
      <p id="subtitle">Add new product you wish to sell</p>

      {/* Divider about product */}
      <div className="customDivider">
        <span className="dividerText">About product</span>
      </div>

      {/* About product */}
      <Form>
        <div className="addProductNamePrice">
          {/* Product name */}
          <div>
            <Form.Label>Product name</Form.Label>
            <Form.Group className="mb-3" controlId="addProductName">
              <Form.Control
                type="text"
                placeholder="Product name"
                required
                ref={productName}
              />
            </Form.Group>
          </div>

          {/* Product price */}
          <div>
            <Form.Label>Price</Form.Label>
            <Form.Group className="mb-3" controlId="addProductName">
              <Form.Control
                type="number"
                placeholder="Enter product price"
                ref={productPrice}
                defaultValue={1}
              />
            </Form.Group>
          </div>
        </div>

        <Form.Label>Category</Form.Label>
        <Form.Select className="mb-3" ref={productCategory}>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Meat">Meat</option>
          <option value="Dairy products">Dairy products</option>
          <option value="Bakery">Bakery</option>
          <option value="Nuts">Nuts</option>
          <option value="Grains">Grains</option>
          <option value="Sweets">Sweets</option>
          <option value="Oils">Oils</option>
        </Form.Select>

        <Form.Group className="mb-3" controlId="addProductDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} ref={productDesc} />
        </Form.Group>

        {/* Divider stock amount */}
        <div className="customDivider">
          <span className="dividerText">Amount in stock</span>
        </div>

        {/* Product stock checkbox */}
        <div className="addProductStockFlex">
          <Form.Group className="mb-3" controlId="addProductInStock">
            <Form.Check
              type="checkbox"
              label="In stock"
              checked={productInStock}
              onClick={() => setProductInStock(!productInStock)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="addProductName">
            <Form.Control
              type="number"
              placeholder="Enter amount in stock"
              style={
                productInStock ? { display: "unset" } : { display: "none" }
              }
              ref={productStockAmount}
              defaultValue={1}
            />
          </Form.Group>
        </div>

        {/* Product images upload */}
        {/* Divider product images */}
        <div className="customDivider">
          <span className="dividerText">Product images</span>
        </div>

        {/* Images preview */}
        <div className="addProductImagesPreview">
          {uploadImages.map((img, index) => (
            <Image
              src={img.preview}
              id={img.preview}
              width="180px"
              height="150px"
              onClick={(e) => {
                setUploadImages((prev) =>
                  prev.filter((prev_img) => prev_img.preview !== e.target.id)
                );
              }}
              key={index + img.preview}
            />
          ))}
        </div>

        {/* Upload button */}
        <input
          className="form-control mb-3 mt-2"
          accept=".jpg, .jpeg, .png"
          type="file"
          disabled={uploadImages.length === 3}
          onChange={(e) => {
            setSelectedImage(e.target.files[0]);
            e.target.value = "";
          }}
        />

        {/* Product buttons */}
        <div className="addProductButtons">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setShowNewItmModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="button"
            onClick={() => handleAddProduct(uploadImages)}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
