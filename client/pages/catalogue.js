import { signOut, getSession } from "next-auth/react";

export default function Catalogue({ session, user }) {
  console.log(user);

  return (
    <div>
      <img src={user.image} alt="" />
      <h1>Welcome {user?.name}</h1>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session?.user;

  console.log(session);

  // redirect
  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: { session, user },
  };
}
