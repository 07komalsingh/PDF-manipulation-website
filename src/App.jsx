import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Navbar from "./components/Navbar";


import FileUpload from "./components/FileUpload";
import Reorder from "./components/Reorder";
import SplitPage from "./components/SplitPage";
import RemovePages from "./components/RemovePages";
import AddBlankPage from "./components/addBlankPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/file" element={<FileUpload />} />
        
        <Route path="/reorder" element={<Reorder />} />
        
        <Route path="/split" element={<SplitPage />} />
        <Route path="/remove" element={<RemovePages />} />
        
        <Route path="/add_blank" element={<AddBlankPage />} />
        
        
        
      </Routes>
      
    </Router>
  );
}

export default App;
