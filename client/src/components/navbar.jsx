import { NavLink } from "react-router-dom";
import Logo from "./../assets/logo.jpeg";

const Navbar = () => {
  return (
    <nav className="bg-black">
      <div className="h-10vh flex justify-between z-50 text-white lg:py-5 px-20 py-4 ">
        <div className="flex items-center flex-1">
          <img
            src={Logo}
            alt="whiteboardlogo"
            className="flex w-11 h-11 -my-4"
          ></img>
          <span className="text-lg font-bold ">Collaborative Whiteboard</span>
        </div>
        <div className="lg:flex md:flex lg: flex-1 items center justify-end font-normal hidden">
          <div className="flex-10 ">
            <ul className="flex gap-8 mr-16 text-lg font-bold">
              <NavLink
                to="/Login"
                className="z-10 hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-1 before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-blue-700 before:absolute before:left-0 before:bottom-0"
              >
                <li>Login</li>
              </NavLink>
              <NavLink
                to="/Login"
                className="z-10 hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-1 before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-blue-700 before:absolute before:left-0 before:bottom-0 "
              >
                <li>Sign Up</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
