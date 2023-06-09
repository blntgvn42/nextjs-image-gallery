'use client'
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface NavbarProps {
}

function NavBar() {
    const pathname = usePathname()

    return (
        <Navbar bg='primary' variant='dark' sticky='top' expand='md'
                collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} href='/'>
                    NextJS 13.4 Image Gallery
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='main-navbar'/>
                <Navbar.Collapse id='main-navbar'>
                    <Nav>
                        <Nav.Link as={Link} href='/hello' active={pathname === '/hello'}>No route</Nav.Link>
                        <Nav.Link as={Link} href='/static' active={pathname === '/static'}>Static Random Image</Nav.Link>
                        <Nav.Link as={Link} href='/dynamic' active={pathname === '/dynamic'}>Dynamic Random Image</Nav.Link>
                        <Nav.Link as={Link} href='/isr' active={pathname === '/isr'}>Incremental Server Regeneration</Nav.Link>
                        <NavDropdown title={'Topics'} id='topics-dropdown'>
                            <NavDropdown.Item as={Link} href='/topics/health' active={pathname === '/topics/health'}>Health</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href='/topics/nature' active={pathname === '/topics/nature'}>Nature</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href='/topics/food' active={pathname === '/topics/food'}>Food</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} href='/search' active={pathname === '/search'}>Search</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;