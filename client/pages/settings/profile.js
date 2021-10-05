// Bootstrap imports
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Nextjs imports
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// React imports
import { useState, useRef } from "react";
import { BsCheck2Circle, BsX } from "react-icons/bs";

// Component imports
import Layout from "../layout/_layout";
import PersonalInfo from "./_personalInfo";
import EditFarm from "./_editFarm";
import FileUploadModal from "../../components/Modal/FileUploadModal";

// SQL Database
import prisma from "../../prisma/client";

export default function EditProfile({ provinces, user, userInfo }) {
  const [displayProfile, setDisplayProfile] = useState(true);
  const [displaySubmitted, setDisplaySubmitted] = useState(false);

  // User form refs
  const userFirstName = useRef();
  const userLastName = useRef();
  const userPhone = useRef();
  const userAddress = useRef();
  const userProvince = useRef();
  const userDistrict = useRef();
  const userSubDistrict = useRef();
  const userPostalCode = useRef();
  const userSocial = useRef();

  // Farm form refs
  const farmName = useRef();
  const farmAddress = useRef();
  const farmProvince = useRef();
  const farmDistrict = useRef();
  const farmSubDistrict = useRef();
  const farmAbout = useRef();
  const farmPhone = useRef();
  const farmSocialLink = useRef();
  const farmSellingMethod = useRef();

  // Submit function
  const handleSubmit = async () => {
    // Handle submit user info
    const userRes = await fetch("http://localhost:3000/api/form/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${userFirstName.current.value} ${userLastName.current.value}`,
        email: user.email,
        phone: userPhone.current.value,
        address: userAddress.current.value,
        province: userProvince.current.value,
        district: userDistrict.current.value,
        subDistrict: userSubDistrict.current.value,
        postalCode: userPostalCode.current.value,
        socialLink: userSocial.current.value,
      }),
    });

    // If successfully updated
    if (userRes.status === 200) {
      setDisplaySubmitted(true);
      setTimeout(() => setDisplaySubmitted(false), 6000);
    }
  };

  return (
    <main className="profileSettingsPage">
      {displaySubmitted ? (
        <Alert variant="success" className="alertSubmiited">
          <BsCheck2Circle /> Update profile successfully!{" "}
          <BsX onClick={() => setDisplaySubmitted(false)} />
        </Alert>
      ) : null}
      <div className="container profileSettingsContainer">
        {/* Settings nav */}
        <section>
          <h5>Settings</h5>
          <p id="subtitle">Customize view and extra actions</p>
          <nav className="profileSettingsNav">
            <ul>
              <li
                className={displayProfile ? "active" : undefined}
                onClick={() => setDisplayProfile(true)}
              >
                Personal
              </li>
              <li
                className={!displayProfile ? "active" : undefined}
                onClick={() => setDisplayProfile(false)}
              >
                Edit Farm
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
          f={{
            farmName,
            farmAddress,
            farmProvince,
            farmDistrict,
            farmSubDistrict,
            farmAbout,
            farmPhone,
            farmSocialLink,
            farmSellingMethod,
          }}
        />

        {/* Profile pic */}
        <section className="profilePicture">
          <h5>My profile picture</h5>
          <p id="subtitle">Add a photo of you to be easily recognized</p>

          {/* Display picture */}
          <div className="profileImg">
            <Image src={user.image} width="160px" height="160px" />
          </div>

          {/* Add profile image button */}
          <Button variant="success">Upload profile image</Button>
        </section>
      </div>

      {/* Confirm buttons */}
      <div className="container confirmButtons">
        <Link href="/home/catalogue">
          <Button variant="secondary">Cancel</Button>
        </Link>
        <Button onClick={() => handleSubmit()}>Confirm</Button>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session?.user;

  // redirect
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // Fetch provinces
  const provinces = await fetch("http://localhost:3000/api/places/fetch");
  const provinces_data = await provinces.json();

  // Fetch user info
  const userInfo = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });
  await prisma.$disconnect();
  // console.log(userInfo);

  return {
    props: { user, provinces: provinces_data, userInfo },
  };
}

EditProfile.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
