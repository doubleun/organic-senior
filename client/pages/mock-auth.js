import { signOut, getSession, useSession } from "next-auth/react";

export default function MockAuth() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div>
      <img src={session.user.image} alt="" />
      <h1>Welcome {session.user?.name}</h1>
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
