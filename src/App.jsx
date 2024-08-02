

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";
import MergePDF from "./components/Mergepdf";
import PageNotFound from "./components/PageNotFound";
import Footer from "./components/Footer";
import PdfToDocs from "./components/PdfToDocs";
import FileUpload from "./components/FileUpload";

 
function App() {
  let splitprops = "Split PDF Files";
  let removeprops = "Remove Pages";
 
  return (
    <Router>
      <Navbar />
 
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/split" element={<FileUpload commonp={splitprops} />} />
        <Route path="/merge" element={<MergePDF />} />
        <Route path="/remove" element={<FileUpload  commonp={removeprops}/>} />
        <Route path="/convert" element={<PdfToDocs />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
 
export default App;
 
