
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import MainLayout from './components/MainLayout';

import MergePDF from './components/Mergepdf';
import PageNotFound from './components/PageNotFound';

import RemovePages from './components/RemovePages';
import Footer from './components/Footer';
import PdfToDocs from './components/PdfToDocs';
import FileUpload from './components/FileUpload';

function App() {
  let splitprops='split page'

  return (
    <Router>
      <Navbar /> {/* Always show Navbar */}
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/split" element={<FileUpload name={splitprops}/>} />
        <Route path="/merge" element={<MergePDF />} />
        <Route path="/remove" element={<RemovePages />} />
        <Route path="/convert" element={<PdfToDocs />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
