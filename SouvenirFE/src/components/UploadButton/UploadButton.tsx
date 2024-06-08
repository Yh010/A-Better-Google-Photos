import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const UploadComponent: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles) return;

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("photos", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setUploadSuccess(true);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Pic</button>
      {uploadSuccess && <p>Files uploaded successfully!</p>}
    </div>
  );
};

export default UploadComponent;
