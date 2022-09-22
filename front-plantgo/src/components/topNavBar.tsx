import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/plantgo-black.png'
import {FaMapMarkedAlt} from "react-icons/fa";

const TopNavBar = () => {
  return (
    <>
      <Navbar fixed="top" bg="light" variant="light">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="" style={{
              width:70,
              height:70
            }}/>
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/" className='me-2'>
              <FaMapMarkedAlt style={{
                width:50,
                height:50}}/>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default TopNavBar;

