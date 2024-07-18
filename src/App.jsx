
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import SplitPage from './components/SplitPage';
import MergePDF from './components/MergePDF';

 function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/split" element={<SplitPage />} />
      <Route path="/merge-pdf" element={<MergePDF/>}/>
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
    </Router>
    
  );
}
  export default App;