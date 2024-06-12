import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import LandingPageAlert from "../Alerts/LandingPageAlert";

const UploadComponent: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [useremail, setUseremail] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [alertOn, setAlertOn] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const [emailAlert, setEmailAlert] = useState(false);
  const [photoAlert, setPhotoAlert] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
      setPhotoAlert(false);
    }
  };

  const handleUpload = async () => {
    setWaiting(true);
    if (!selectedFiles || !useremail) {
      if (!selectedFiles && !useremail) {
        setAlertMsg("User Email and Photos");
        setAlertOn(true);

        setEmailAlert(true);
        setPhotoAlert(true);
        setWaiting(false);
        return;
      } else if (!useremail) {
        setAlertMsg("User Email");
        setAlertOn(true);

        setEmailAlert(true);
        setPhotoAlert(false);
        setWaiting(false);
        return;
      } else {
        setAlertMsg("Photos");
        setAlertOn(true);

        setEmailAlert(false);
        setPhotoAlert(true);
        setWaiting(false);
        return;
      }
    }

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
        setUploadSuccess(true);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setWaiting(false);
    }
  };

  // useEffect to clear the alert message after 5 seconds
  useEffect(() => {
    if (alertOn || emailAlert || photoAlert) {
      const timer = setTimeout(() => {
        setAlertOn(false);
        setAlertMsg("");
        setEmailAlert(false);
        setPhotoAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertOn, emailAlert, photoAlert]);

  // useEffect to reset upload success message after 5 seconds
  useEffect(() => {
    if (uploadSuccess) {
      const timer = setTimeout(() => {
        setUploadSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [uploadSuccess]);

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
        {emailAlert && <LandingPageAlert msg={alertMsg} />}
      </div>
      <div>
        <input type="file" multiple onChange={handleFileChange} />
        {photoAlert && <LandingPageAlert msg={alertMsg} />}
      </div>
      <button onClick={handleUpload}>Upload Pic</button>
      {!alertOn && waiting && <p>Uploading files, please wait...</p>}
      {uploadSuccess && <p>Files uploaded successfully!</p>}
    </div>
  );
};

export default UploadComponent;
