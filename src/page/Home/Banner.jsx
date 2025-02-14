import { IoIosRocket } from "react-icons/io";
import { RiVideoLine } from "react-icons/ri";


const Banner = () => {
    return (
        <div>
                <div className="flex flex-col items-center justify-center   text-center p-6">
      <h1 className="text-4xl font-bold  mb-4">Discover & Collect <br /> Extraordinary NFTs</h1>
      <p className="text-lg  mb-6 max-w-xl">
      Enter the world of digital art and collectibles. Explore unique NFTs created by artists worldwide.      </p>
      <div className="flex gap-4">
        <button className="px-6 flex gap-2 py-3 bg-gradient-to-l rounded-lg to-pink-500 from-purple-500"><IoIosRocket className="my-auto" />Start Creating</button>
        <button className="px-6 py-3 flex gap-2 bg-gray-800 border border-gray-600  rounded-lg hover:bg-gray-700"><RiVideoLine className="my-auto"/>Watch Demo</button>
      </div>
    </div>
        </div>
    );
};

export default Banner;