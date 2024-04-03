import bgVideo from "../assets/whiteboardvid.mp4";
import { NavLink } from "react-router-dom";

const dashVideo = () => {
  return (
    <div className="relative h-screen">
      <video autoPlay loop muted className="h-full w-full object-fill">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-white">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl mb-8 text-center">
          Welcome to the Collaborative Whiteboard
        </h1>
        <div className="flex flex-col items-center">
          <NavLink to="/Login">
            <button className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-700 hover:text-green-300 focus:outline-none focus:bg-blue-800 opacity-85 ease-in-out duration-300">
              Sign Up Now
            </button>
          </NavLink>
          <NavLink to="/Login">
            <button className="mt-5 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 hover:text-green-300 focus:outline-none focus:bg-gray-900 opacity-85 ease-in-out duration-300">
              Already Signed Up? Login Here
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default dashVideo;
