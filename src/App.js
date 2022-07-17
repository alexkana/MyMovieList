import {Routes,Route} from "react-router-dom"
import {Container} from "react-bootstrap"
import {Home} from "./pages/Home"
import {Add} from "./pages/Add"
import {About} from "./pages/About"
import {Navbar} from "./components/Navbar"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <>
    <Navbar/>
    <Container className="mb-4">
      <ToastContainer position="top-center"/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<Add/>} />
        <Route path="/add/:id" element={<Add/>} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Container>
    </>
  );
}

export default App;
