import { Outlet } from "react-router-dom";
import Navbar from "../components/homeComponents/Navbar";

export default function Root() {
  return (
    <>
      <main className="w-full">
        <div className="hidden lg:flex lg:flex-col">
          <Navbar />
        </div>
        <div className=" w-full">
          <Outlet />
        </div>
        {/* <FooterPage /> */}
      </main>
    </>
  );
}
