
import Navbar from './components/Navbar'
import DocumentSolution from './components/document';
import FileUpload from './components/FileUpload';
import Footer from './components/Footer';
// import PremiumSol from './components/Premium';
import Tools from './components/Tools'

function App() {

  return (
    <>
      <Navbar />
      <DocumentSolution />
      <FileUpload />
      <Tools />
      {/* <PremiumSol /> */}
      <Footer />
    </>
  )
}

export default App
