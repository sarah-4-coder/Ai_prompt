import React, { useState } from "react";

const SearchPopup = ({ onClose, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };
  const handleClose = () => {
    onClose();
  }

  return (
    <div className="absolute bottom-[4rem] left-1/2 translate-x-[-50%] border-none w-[70%] h-[5.5%] flex justify-center ">
      <input
        type="text"
        className="w-[50%]  h-full px-4 outline-none rounded-lg"
        placeholder="Enter your prompt"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch} className="mx-5 bg-gray-900 text-white px-3 py-2 rounded-lg">Search</button>
      <button onClick={handleClose} className=" bg-gray-900 text-white px-3 py-2 rounded-lg">Close</button>
    </div>
  );
};

export default SearchPopup;
