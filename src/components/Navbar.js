import {Container,Nav,Navbar as NavBoot} from "react-bootstrap"
import { Link, NavLink } from "react-router-dom"
import {useNavigate} from 
import logo from '../assets/logo.png';

//Navbar of the website

export function Navbar() {

  let navigate = useNavigate();

  function changeLocation(placeToGo){
        navigate(placeToGo, { replace: true });
       // window.location.reload();
  }
    return (
     <NavBoot className="bg-white mb-3 shadow">
        <Container>
          <Nav>
            <Nav.Item as={NavLink} to="/"><img src={logo} alt="Logo" style={{height:"1.8rem", width:"1.8rem", marginTop:"5px"}}/></Nav.Item>
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/add" onClick={()=>changeLocation("/add")} >Add</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
          </Nav>
        </Container>
      </NavBoot>
    );

}