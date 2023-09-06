import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { userLogout } from '../actions/userLogin'
import { useNavigate } from 'react-router-dom';
import { deleteCookie } from '../services/cookie';
import { useDispatch } from 'react-redux';
function NavbarBootstap(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = () => {
    console.log('logout claled');
    deleteCookie("userAuth")
    dispatch(userLogout())
    localStorage.removeItem("userDetails")
    navigate("/login")
  }
  return (
   <>
    <Navbar bg="primary" data-bs-theme="dark" collapseOnSelect expand="lg" >
      <Container fluid>
        <Navbar.Brand href="#home">Google Classroom</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => props.onComponentChange('classRoom')}>Classroom</Nav.Link>
            <Nav.Link onClick={() => props.onComponentChange('notification')}>Notification</Nav.Link>
            <NavDropdown title="Others" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={() => props.onComponentChange('calender')}>Calender</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">My account</Nav.Link>
            <Nav.Link onClick={ () => handleLogout()}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
   </>
  );
}

export default NavbarBootstap;