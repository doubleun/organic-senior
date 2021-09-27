// Bootstrap imports
import Button from "react-bootstrap/Button";

// Nextjs imports
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

// React imports
import { useState, useRef } from "react";

// Component imports
import Layout from "../layout/_layout";
import PersonalInfo from "./_personalInfo";
import EditFarm from "./_editFarm";

// SQL Database
import prisma from "../../prisma/client";

export default function EditProfile({ provinces, user, userInfo }) {
  const [displayProfile, setDisplayProfile] = useState(true);

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

  // Submit function
  const submitChange = async () => {
    await fetch("http://localhost:3000/api/form/submit", {
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
  };

  return (
    <main className="profileSettingsPage">
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
        <EditFarm provinces={provinces} displayProfile={displayProfile} />

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
        <Button onClick={() => submitChange()}>Confirm</Button>
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
