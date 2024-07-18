import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'
import DocumentSolution from './components/document';
import FileUpload from './components/FileUpload';
import Footer from './components/Footer';
import PremiumSol from './components/Premium';
import Tools from './components/Tools'
import PlayStore from './components/PlayStore';
import SubsForm from './components/SubsForm';
import SplitPage from './components/SplitPage';

function App() {

  return (
    <>
      <Navbar />
      <DocumentSolution />
      <FileUpload />
      <PremiumSol />
       <Tools/>
      <Router>
            <Routes>
                {/* <Route path="/" element={<Tools />} /> */}
                <Route path="/split" element={<SplitPage />} />
                {/* Add other routes here if needed */}
            </Routes>
        </Router>
      <PlayStore/>
      <SubsForm/>
       
     
     
        <Footer />
    </>
  )
}

export default App



// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import DocumentSolution from './components/DocumentSolution';
// import FileUpload from './components/FileUpload';
// import Footer from './components/Footer';
// import PremiumSol from './components/PremiumSol';
// import Tools from './components/Tools';
// import PlayStore from './components/PlayStore';
// import SubsForm from './components/SubsForm';
// import SplitPage from './components/SplitPage';

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <DocumentSolution />
//       <FileUpload />
//       <PremiumSol />
//       <Tools />
      
//       <Routes>
//         <Route path="/split" element={<SplitPage />} />
//         {/* Add other routes here if needed */}
//       </Routes>
      
//       <PlayStore />
//       <SubsForm />
//       <Footer />
//     </Router>
//   );
// }

// export default App;
