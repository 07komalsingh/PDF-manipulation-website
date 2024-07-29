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
          {/* <Navbar/> */}
          <DocumentSolution />
      
          <Tools />
          <PlayStore />
          {/* <SubsForm/> */}
          <PremiumSol />
          {/* <Footer /> */}
        </>
      );
    }

    export default MainLayout;