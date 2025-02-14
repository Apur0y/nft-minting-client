import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { IoWalletOutline } from "react-icons/io5";
import { RiBox2Line } from "react-icons/ri";


const Navbar = () => {
    return (
        <div className="navbar w-11/12 mx-auto bg-black">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
         
          </div>
          <a className="btn btn-ghost text-xl"><RiBox2Line  className="text-purple-800"/></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          
        </div>
        <div className="navbar-end">
          {/* <a className="btn"> <IoWalletOutline />Connect Wallet</a>
           */}
           <ConnectButton></ConnectButton>
        </div>
         <div className="divider"></div>
      </div>
    );
};

export default Navbar;