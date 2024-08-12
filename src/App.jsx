import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";
import MergePDF from "./components/Mergepdf";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import PdfToDocs from "./components/PdfToDocs";
import FileUpload from "./components/FileUpload";
import Reorder from "./components/Reorder";
import AddImage from "./components/AddImage";
import SplitPage from "./components/SplitPage";
import RemovePages from "./components/RemovePages";
import AddBlankPage from "./components/addBlankPage";
import CompressPDF from "./components/compressPdf";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/file" element={<FileUpload />} />
        <Route path="/merge" element={<MergePDF />} />
        <Route path="/reorder" element={<Reorder />} />
        <Route path="/add-image" element={<AddImage />} />
        <Route path="/split" element={<SplitPage />} />
        <Route path="/remove" element={<RemovePages />} />
        <Route path="/convert" element={<PdfToDocs />} />
        <Route path="/add_blank" element={<AddBlankPage />} />
        <Route path="/compress" element={<CompressPDF/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
