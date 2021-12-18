import Navbar from "./Navbar";
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
