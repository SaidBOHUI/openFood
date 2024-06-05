//Composant barre de navigation
import { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import { useNavigate } from "react-router";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Navigationbar = () => {
  //Recuperation de la variable context utilisateur
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  //Fonction de déconnexion
  const logout = async () => {
    try {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log(error);
      return "impossible de vous déconnecter";
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className="nav-link">
              Accueil
            </Link>

            {user ? (
              <>
                <Button size="sm" onClick={logout}>
                  Deconnexion
                </Button>
                <Form inline>
                  <Row>
                    <Col xs="auto">
                      <Form.Control
                        type="text"
                        placeholder="Produit"
                        className=" mr-sm-2"
                      />
                    </Col>
                    <Col xs="auto">
                      <Button type="submit">Recherche</Button>
                    </Col>
                  </Row>
                </Form>
              </>
            ) : (
              <>
                <Link to={"/authentication"} className="nav-link">
                  Se connecter
                </Link>
                <Link to={"/inscription"} className="nav-link">
                  S'inscrire
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigationbar;
