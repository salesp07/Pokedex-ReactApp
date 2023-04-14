import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import axios from '../../api/axios';
import './style.css';

function MyNav({ isAdmin, showGifs }) {
  const handleLogout = async () => {
    await axios.get('/logout', { withCredentials: true })
    window.location.href = '/'
  }
  return (
    <>

      <Navbar key={"md"} bg="light" expand={"md"} className="mb-3 myNav" sticky='top'>
        {showGifs &&
          <div className='gifContainer'>
            <img style={{ width: "100px" }} src="/dance1.gif" alt='pokemon dancing'/>
            <img style={{ width: "140px" }} id="pikaGif" src="/dance2.gif" alt='pikachu dancing'/>
          </div>
        }
        <Container fluid>
          <div id='navLogoContainer'>
            <img src="/favicon.ico" id='logoImg' alt='pokedex logo' />
            <Navbar.Brand href="#" className='title'>Pokédex</Navbar.Brand>
          </div>

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"md"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              {/* <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`}>
                Pokedex Menu
              </Offcanvas.Title> */}
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3 navLinks">
                {isAdmin && <Nav.Link href="/admin">Dashboard</Nav.Link>}
                <Nav.Link href="/pokemons">Pokemons</Nav.Link>
              </Nav>
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>

            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

    </>
  );
}

export default MyNav;