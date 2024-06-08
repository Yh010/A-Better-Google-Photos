import "./App.css";
import CloudinaryUploadWidget from "./components/Cloudinary/CloudinaryUploadWidget";
import Navbar from "./components/Navbar/Navbar";
import UploadComponent from "./components/UploadButton/UploadButton";

function App() {
  return (
    <div>
      <Navbar />
      <CloudinaryUploadWidget />
      multer component
      <UploadComponent />
    </div>
  );
}

export default App;
