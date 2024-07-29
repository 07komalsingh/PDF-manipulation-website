
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import SplitPage from './components/SplitPage';
import MergePDF from './components/Mergepdf';


import Navbar from './components/Navbar'

import PageNotFound from './components/PageNotFound';

import RemovePages from './components/RemovePages';

import PdfToDocs from './components/PdfToDocs';
import Footer from './components/Footer';


 function App() {
  return (
    <Router>
       <Navbar/>

      <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/split" element={<SplitPage />} />
      <Route path="/merge" element={<MergePDF/>}/>

      <Route path="/remove" element={<RemovePages/>}/>
      <Route path="/convert" element={<PdfToDocs />} />
      <Route path="*" element={<PageNotFound />} />
      
    </Routes>
    <Footer />
    </Router>
    
  );
}

  export default App;