import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SortedPhotosPage from "./pages/SortedPhotosPage/SortedPhotosPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sortedphotos" element={<SortedPhotosPage />} />
    </Routes>
  </BrowserRouter>
);
