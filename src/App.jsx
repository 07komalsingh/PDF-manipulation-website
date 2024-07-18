import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SplitPage from './components/SplitPage';
import MergePDF from './components/Mergepdf';
import MainLayout from './components/MainLayout';

 function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/split" element={<SplitPage />} />
      <Route path="/merge-pdf" element={<MergePDF/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Router>
    
  );
}



function NotFound() {
  return <h2>Page not found</h2>;
}

export default App;
