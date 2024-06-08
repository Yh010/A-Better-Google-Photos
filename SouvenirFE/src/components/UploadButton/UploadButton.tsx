import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const UploadComponent: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles || !username || !title || !description) return;

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("photos", file);
    });
    formData.append("username", username);
    formData.append("title", title);
    formData.append("description", description);

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
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <button onClick={handleUpload}>Upload Pic</button>
      {uploadSuccess && <p>Files uploaded successfully!</p>}
    </div>
  );
};

export default UploadComponent;
