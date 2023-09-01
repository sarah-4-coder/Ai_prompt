import React, { useState, useRef } from 'react';
import SearchPopup from './Search';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    localStorage.setItem('uploadedFile', JSON.stringify(droppedFile));
    setShowSearchPopup(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    localStorage.setItem('uploadedFile', JSON.stringify(selectedFile));
    setShowSearchPopup(true);
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const closeSearchPopup = () => {
    setShowSearchPopup(false);
  };

  const handleSearch = (searchTerm) => {
    // Implement your search logic here
    console.log('Searching for:', searchTerm);
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={openFileDialog}
        className='rounded-lg'
        style={{
          width: '100%',
          height: '300px',
          border: '2px dashed #ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
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
        accept=".pdf, .jpg, .png, .doc, .docx"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
      {showSearchPopup && (
        <SearchPopup onClose={closeSearchPopup} onSearch={handleSearch} />
      )}
    </div>
  );
};

export default FileUpload;
