
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import MergePDF from './components/Mergepdf';
import Navbar from './components/Navbar'
import PageNotFound from './components/PageNotFound';
import RemovePages from './components/RemovePages';

import PdfToDocs from './components/PdfToDocs';
import FileUpload from './components/FileUpload';
import Footer from "./components/Footer"
// import AddBlankPage from './components/Add_Blank';

function App() {
  let splitprops='split page'

  return (
    <Router>
       <Navbar/>
      <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/split" element={<FileUpload name={splitprops}/>} />
      <Route path="/merge" element={<MergePDF/>}/>
      <Route path="/remove" element={<RemovePages/>}/>
      <Route path="/convert" element={<PdfToDocs />} />
      {/* <Route path="/add_blank" element = {<AddBlankPage/>}/> */}
      <Route path="*" element={<PageNotFound />} />
      
    </Routes>
    <Footer />
    </Router>
  );
}

export default App;
