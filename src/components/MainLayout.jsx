import React from 'react';
import DocumentSolution from './document';
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
