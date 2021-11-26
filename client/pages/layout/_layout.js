import Navbar from "./_navbar";
// import { getSession, useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
