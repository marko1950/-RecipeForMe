import { useState } from "react";
import Register from "../../Registration/Register"; // Import the overlay card component

const Navbar = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false); // State to control overlay

  return (
    <>
      <nav className="w-[100vw] h-[7vh] pl-16 pr-8 bg-white/70 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.10)] shadow backdrop-blur-xl justify-start items-center gap-8 inline-flex">
        <div className="grow shrink basis-0 h-10 px-8 justify-start items-center gap-8 flex">
          <div className="grow shrink basis-0 h-6" />
          <div className="justify-start items-center gap-4 flex">
            <button>
              <p className="text-[#212121] text-sm font-medium font-sans leading-[21px]">
                Log in
              </p>
            </button>
          </div>
          <div
            className="px-4 py-2.5 bg-[#E65100] rounded-lg shadow-[0px_4px_6px_-1px_rgba(33,33,33,0.20)] justify-center items-center gap-2 flex overflow-hidden cursor-pointer"
            onClick={() => setIsRegisterOpen(true)} // Open overlay on click
          >
            <p className="text-white text-xs font-bold font-sans uppercase leading-[18px]">
              Sign in
            </p>
          </div>
        </div>
      </nav>

      {/* Register Overlay */}
      {isRegisterOpen && <Register onClose={() => setIsRegisterOpen(false)} />}
    </>
  );
};

export default Navbar;
