
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import SplitPage from './components/SplitPage';
import MergePDF from './components/Mergepdf';
import PageNotFound from './components/PageNotFound';
import PdfToDocs from './components/PdfToDocs';

 function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/split" element={<SplitPage />} />
      <Route path="/merge" element={<MergePDF/>}/>
      <Route path="/convert" element={<PdfToDocs />} />
      <Route path="*" element={<PageNotFound />} />
      
    </Routes>
    </Router>
    
  );
}

  export default App;