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
        <label className="block text-sm font-medium leading-6 text-gray-900">
          <div className=" flex relative mt-2 rounded-md shadow-sm">
            <p className="m-3">Input your email here </p>

            <input
              type="text"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
              required
              className="block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            />
          </div>
        </label>
        {emailAlert && <LandingPageAlert msg={alertMsg} />}
      </div>
      <div>
        <input type="file" multiple onChange={handleFileChange} />
        {photoAlert && <LandingPageAlert msg={alertMsg} />}
      </div>
      <button
        className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        onClick={handleUpload}
      >
        <UploadIcon className="mr-2 h-4 w-4" />
        Upload Pic
      </button>
      {!alertOn && waiting && <p>Uploading files, please wait...</p>}
      {uploadSuccess && <p>Files uploaded successfully!</p>}
    </div>
  );
};

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

export default UploadComponent;
