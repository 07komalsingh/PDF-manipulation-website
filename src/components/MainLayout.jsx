import React from 'react';

// import Navbar from './Navbar'
import DocumentSolution from './document';

// import Footer from './Footer';
import PremiumSol from './Premium';
import Tools from './Tools'
import PlayStore from './PlayStore'; 
function MainLayout() {
  return (
    <>
      <DocumentSolution />     
      <Tools />
      <PlayStore />
      <PremiumSol />     
    </>
  );
}

export default MainLayout;
