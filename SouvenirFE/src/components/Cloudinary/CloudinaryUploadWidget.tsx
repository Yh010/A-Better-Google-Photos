import React, { useEffect } from "react";

const CloudinaryUploadWidget: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.type = "text/javascript";
    document.body.appendChild(script);

    script.onload = () => {
      const myWidget = (window as any).cloudinary.createUploadWidget(
        {
          cloudName: "ddy16nqzp",
          uploadPreset: "my_preset",
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
          }
        }
      );

      document.getElementById("upload_widget")?.addEventListener(
        "click",
        () => {
          myWidget.open();
        },
        false
      );
    };
  }, []);

  return (
    <button id="upload_widget" className="cloudinary-button">
      Upload files
    </button>
  );
};

export default CloudinaryUploadWidget;
