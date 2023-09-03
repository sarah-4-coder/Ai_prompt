import React, { useState, useEffect } from 'react';
import FileUpload from './Drop';

const Prompt = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const savedFileData = localStorage.getItem('savedFiles');
    if (savedFileData) {
      setFiles(JSON.parse(savedFileData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedFiles', JSON.stringify(files));
  }, [files]);

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const handleFileUpload = (file) => {
    setFiles((prevFiles) => [...prevFiles, file]);
  };

  return (
    <div className="flex">
      <section className="bg-gray-900 w-[25%] h-screen text-white">
        <h2>Sidebar</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <a
                href={URL.createObjectURL(file)}
                download={file.name}
                onClick={() => handleFileClick(file)}
              >
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="right relative w-[75%] h-screen bg-gray-500">
        <div className="drop w-[60%] m-auto pt-[12%] ">
          <FileUpload onFileSelect={handleFileUpload} />
        </div>
      </section>
    </div>
  );
};

export default Prompt;
