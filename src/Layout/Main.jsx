import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar";

const Main = () => {
  return (
    <div className="bg-black">
      <Navbar></Navbar>
      <div className="divider"></div>

      
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
