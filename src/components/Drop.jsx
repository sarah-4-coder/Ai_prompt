import React, { useState, useRef, useEffect } from "react";
import SearchPopup from "./Search";

const FileUpload = ({ onFileSelect }) => {
  const [file, setFile] = useState(null);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const fileInputRef = useRef(null);
  const [savedFiles, setSavedFiles] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const savedFileData = localStorage.getItem("savedFiles");
    if (savedFileData) {
      setSavedFiles(JSON.parse(savedFileData));
    }
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setShowSearchPopup(true);

    // Save the dropped file to local storage
    const updatedFiles = [...savedFiles, droppedFile];
    localStorage.setItem("savedFiles", JSON.stringify(updatedFiles));
    setSavedFiles(updatedFiles);

    // Pass the dropped file to the parent component
    onFileSelect(droppedFile);
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setShowSearchPopup(true);

    // Save the selected file to local storage
    const updatedFiles = [...savedFiles, selectedFile];
    localStorage.setItem("savedFiles", JSON.stringify(updatedFiles));
    setSavedFiles(updatedFiles);

    // Pass the selected file to the parent component
    onFileSelect(selectedFile);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const closeSearchPopup = () => {
    setShowSearchPopup(false);
  };

  const handleSearch = async (searchTerm) => {
    const response = await fetch(
      "http://localhost:5000/generate_plot",
      {
        method: "POST",
        body: JSON.stringify({
          prompt_text: searchTerm,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
    //this api returns a image file
    const data = await response.blob();
   const image = new File([data], "plot.png", { type: "image/png" });
    setImage(image);
    console.log(image);
    console.log("Searching for:", searchTerm);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={openFileDialog}
        className="rounded-lg"
        style={{
          width: "100%",
          height: "300px",
          border: "2px dashed #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {file ? (
          <p>File uploaded: {file.name} or click to upload another file</p>
        ) : (
          <p>Drag & drop a file here or click to select</p>
        )}
      </div>
      <input
        type="file"
        accept=".pdf, .jpg, .png, .doc, .docx, .csv, .txt"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
      {showSearchPopup && (
        <SearchPopup onClose={closeSearchPopup} onSearch={handleSearch} />
      )}
      {image && (
        <div>
          <img src={URL.createObjectURL(image)} alt="plot" />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
