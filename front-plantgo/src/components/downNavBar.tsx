import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/plantgo-black.png'
import { IoIosArrowBack } from "react-icons/io";
import {BsCamera, BsPlusLg} from "react-icons/bs"
import { useNavigate } from 'react-router-dom';

const DownNavBar = () => {
  let Navigate = useNavigate();
  return (
    <>
      <Navbar fixed="bottom" bg="light" variant="light">
        <Container>
          <Nav>
            <Nav.Link onClick={() => {Navigate(-1)}} className='me-2'>
              <IoIosArrowBack style={{
                width:50,
                height:50}}/>
            </Nav.Link>
            <Nav.Link onClick={() => {Navigate("/camera")}} className='me-2'>
              <BsCamera style={{
                width:50,
                height:50}}/>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default DownNavBar;