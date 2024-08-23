import React, { useContext } from "react";
import { MdCancel } from "react-icons/md";
import { CartContext } from "../CartContext";

const InitialModal = () => {
  const { showInitialModal, setShowInitialModal } = useContext(CartContext);
  return (
    <div className="w-[60%] h-[60%]  p-3 rounded-md  bg-cover">
      <div className="flex justify-end">
        <MdCancel
          onClick={() => setShowInitialModal(false)}
          className="text-lg md:text-2xl lg:text-3xl cursor-pointer hover:scale-110 transition-all duration-300 ease-out"
        />
      </div>
      <div
        style={{
          backgroundImage: "url('/offerBanner.jpg')",
        }}
        className="w-full h-full rounded-md  bg-cover mt-2"
      ></div>
    </div>
  );
};

export default InitialModal;
