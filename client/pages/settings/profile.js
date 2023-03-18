// TODO: Upload for farm pics

// Bootstrap imports
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import BASE_URL from '/constants'

// Nextjs imports
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

// React imports
import { useState, useRef } from 'react'
import { BsCheck2Circle, BsX } from 'react-icons/bs'

// Component imports
import Layout from '/components/Layout'
import PersonalInfo from '/components/Settings/PersonalInfo'
import EditFarm from '/components/Settings/EditFarm'

// SQL Database
import prisma from '../../prisma/client'

export default function EditProfile({ provinces, user, userInfo, farmInfo }) {
  const [loading, setLoading] = useState(false)
  const [userInfoUI, setUserInfoUI] = useState(userInfo)
  const [displayProfile, setDisplayProfile] = useState(true)
  const [editFarmLock, setEditFarmLock] = useState(farmInfo === null)
  const [displaySubmitted, setDisplaySubmitted] = useState(false)
  const [farmSellingMethod, setFarmSellingMethod] = useState({
    storeFront: false,
    delivery: false,
  })
  const [selectedImage, setSelectedImage] = useState()

  // User form refs
  const userFirstName = useRef()
  const userLastName = useRef()
  const userPhone = useRef()
  const userAddress = useRef()
  const userProvince = useRef()
  const userDistrict = useRef()
  const userSubDistrict = useRef()
  const userPostalCode = useRef()
  const userSocial = useRef()

  // Farm form refs
  const farmName = useRef()
  const farmAddress = useRef()
  const farmProvince = useRef()
  const farmDistrict = useRef()
  const farmSubDistrict = useRef()
  const farmPostalCode = useRef()
  const farmAbout = useRef()
  const farmPhone = useRef()
  const farmSocialLink = useRef()
  const farmStoreFront = useRef()
  const farmDelivery = useRef()

  // Submit function
  const handleSubmit = async () => {
    // Sets loading to true
    setLoading(true)
    // Handle submit user info
    const userRes = await fetch(`${BASE_URL}/api/form/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        farm_lock: editFarmLock,

        // Personal info
        name: `${userFirstName.current.value} ${userLastName.current.value}`,
        email: user.email,
        phone: userPhone.current.value,
        address: userAddress.current.value,
        province: userProvince.current.value,
        district: userDistrict.current.value,
        subDistrict: userSubDistrict.current.value,
        postalCode: userPostalCode.current.value,
        socialLink: userSocial.current.value,

        ...(!editFarmLock && {
          // Farm info
          farmName: farmName.current.value,
          farmAddress: farmAddress.current.value,
          farmProvince: farmProvince.current.value,
          farmDistrict: farmDistrict.current.value,
          farmSubDistrict: farmSubDistrict.current.value,
          farmPostalCode: farmPostalCode.current.value,
          farmAbout: farmAbout.current.value,
          farmPhone: farmPhone.current.value,
          farmSocialLink: farmSocialLink.current.value,
          farmStoreFront: farmSellingMethod.storeFront,
          farmDelivery: farmSellingMethod.delivery,
        }),
      }),
    })

    // If successfully updated
    if (userRes.status === 200) {
      setDisplaySubmitted(true)
      setTimeout(() => setDisplaySubmitted(false), 6000)
    }
    setLoading(false)
  }

  // Handle farm selling methods check box
  const handleFarmCheck = (e) => {
    if (e.target.checked) {
      setFarmSellingMethod((prev) => ({ ...prev, [e.target.id]: true }))
    } else {
      setFarmSellingMethod((prev) => ({ ...prev, [e.target.id]: false }))
    }
  }

  // Handle profile upload
  const handleUploadImage = async (action, image) => {
    // Sets loading to true
    setLoading(true)
    // If no image selected, stop the function
    if (!image) return
    const formData = new FormData()
    formData.append('image', image)

    // Upload to cloudinary
    const res = await fetch(`${BASE_URL}/api/settings/upload`, {
      method: 'POST',
      body: formData,
    })
    const newImage = await res.json()

    // Update database to cloudinary
    const resUpdate = await fetch(`${BASE_URL}/api/settings/update-database`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action,
        email: userInfo.email,
        img_url: newImage.img_url,
      }),
    })
    if (resUpdate.status === 200) {
      const data = await resUpdate.json()
      console.log(data)

      setDisplaySubmitted(true)
      setTimeout(() => setDisplaySubmitted(false), 6000)

      // Update user info UI
      setUserInfoUI(data.prismaRes)
    }
    setLoading(false)
  }

  return (
    <main className="profileSettingsPage">
      {displaySubmitted ? (
        <Alert variant="success" className="alertSubmiited">
          <BsCheck2Circle /> Update profile successfully!{' '}
          <BsX onClick={() => setDisplaySubmitted(false)} />
        </Alert>
      ) : null}
      <div className="container profileSettingsContainer">
        {/* Settings nav */}
        <section>
          <h5>ตั้งค่า</h5>
          <p id="subtitle">ตั้งค่าข้อมูลต่างๆ เพื่อง่ายสำหรับการติดต่อ</p>
          <nav className="profileSettingsNav">
            <ul>
              <li
                className={displayProfile ? 'active' : undefined}
                onClick={() => setDisplayProfile(true)}
              >
                ส่วนตัว
              </li>
              <li
                className={!displayProfile ? 'active' : undefined}
                onClick={() => setDisplayProfile(false)}
              >
                ฟาร์ม
              </li>
            </ul>
          </nav>
        </section>

        {/* Persoal info */}
        <PersonalInfo
          provinces={provinces}
          displayProfile={displayProfile}
          userInfo={userInfo}
          u={{
            userFirstName,
            userLastName,
            userPhone,
            userAddress,
            userProvince,
            userDistrict,
            userSubDistrict,
            userPostalCode,
            userSocial,
          }}
        />

        {/* Edit farm */}
        <EditFarm
          provinces={provinces}
          displayProfile={displayProfile}
          editFarmLock={editFarmLock}
          setEditFarmLock={setEditFarmLock}
          farmInfo={farmInfo}
          handleFarmCheck={handleFarmCheck}
          loading={loading}
          setLoading={setLoading}
          userInfoUI={userInfoUI}
          f={{
            farmName,
            farmAddress,
            farmProvince,
            farmDistrict,
            farmSubDistrict,
            farmPostalCode,
            farmAbout,
            farmPhone,
            farmSocialLink,
            farmSellingMethod,
            farmStoreFront,
            farmDelivery,
          }}
          handleUploadImage={handleUploadImage}
        />

        {/* Profile pic */}
        <section className="profilePicture">
          <h5>ภาพโปรไฟล์</h5>
          <p id="subtitle">Add a photo of you to be easily recognized</p>

          {/* Display picture */}
          <div className="profileImg">
            <Image src={userInfoUI.image} width="160px" height="160px" />
          </div>

          {/* Add profile image button */}
          <input
            className="form-control mb-2"
            accept=".jpg, .jpeg, .png"
            type="file"
            onChange={(e) => setSelectedImage(e.target.files[0])}
            disabled={loading}
          />
          <Button
            variant="success"
            disabled={!selectedImage}
            onClick={() => handleUploadImage('profile', selectedImage)}
            disabled={loading}
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
            Upload profile image
          </Button>
        </section>
      </div>

      {/* Confirm buttons */}
      <div className="container confirmButtons">
        <Link href="/home/catalogue">
          <Button variant="secondary" disabled={loading}>
            Cancel
          </Button>
        </Link>
        <Button onClick={() => handleSubmit()} disabled={loading}>
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
    </main>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const user = session?.user

  // redirect
  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  // Fetch provinces
  const provinces = await fetch(`${BASE_URL}/api/places/fetch`)
  const provinces_data = await provinces.json()

  // Fetch user info
  const userInfo = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
    include: {
      FarmMain: true,
    },
  })

  // // Fetch farm info
  // const farmInfo = await prisma.farmMain.findFirst({
  //   where: {
  //     user_id: userInfo.id,
  //   },
  // });
  await prisma.$disconnect()
  // console.log(userInfo);

  return {
    props: {
      user,
      provinces: provinces_data,
      userInfo,
      farmInfo: userInfo?.FarmMain,
    },
  }
}

EditProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
