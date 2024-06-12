import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const UploadComponent: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [useremail, setUseremail] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [waiting, setwaiting] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    setwaiting(true);
    if (!selectedFiles || !useremail) return;

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("photos", file);
    });
    formData.append("useremail", useremail);

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
        setwaiting(false);
        setUploadSuccess(true);
      }
    } catch (error) {
      setwaiting(false);
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <div>
        <label>
          Useremail:
          <input
            type="text"
            value={useremail}
            onChange={(e) => setUseremail(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <button onClick={handleUpload}>Upload Pic</button>
      {waiting && <p>uploading files please wait...</p>}
      {uploadSuccess && <p>Files uploaded successfully!</p>}
    </div>
  );
};

export default UploadComponent;
