import { useEffect, useState } from "react";
import {
  Card,
  ListGroup,
  Table,
  Image,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../context/authProvider";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { user, setUser } = useAuth();

  useEffect(() => {
    axios
      .get(`/product/barcode/${id}`)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [id]);

  return (
    <Container>
      <Card style={{ width: "100%", marginTop: "70px" }}>
        <Card.Header as="h3">{product?.product_name}</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Image src={product?.image_front_url} alt="Product Image" fluid />
            </Col>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Mark:</strong> {product?.brands}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Categorie:</strong> {product?.categories}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Labels, certifications, récompenses:</strong>{" "}
                  {product?.labels_old}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Quantité:</strong> {product?.quantity}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Allergens:</strong> {product?.allergens}
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className={`grade grade-${product?.nutrition_grades}`}>
                    <strong>Nutrition Grade:</strong>{" "}
                    {product?.nutrition_grades?.toUpperCase()}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
              <h5>Ingredients</h5>
              <p>{product?.ingredients_text_fr}</p>
              {user ? (
                <Link to={`/produit/alternate/${id}`}>
                  <Button variant="primary">Alternatives</Button>
                </Link>
              ) : (
                <></>
              )}
            </Col>
            <Col md={6}>
              <h5>Information de nutrition</h5>
              <Table striped bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>Energie</td>
                    <td>{product?.nutriments?.energy} kJ</td>
                  </tr>
                  <tr>
                    <td>Matiere grasse</td>
                    <td>{product?.nutriments?.fat} g</td>
                  </tr>
                  <tr>
                    <td>Acides gras saturés</td>
                    <td>{product?.nutriments?.saturated_fat} g</td>
                  </tr>
                  <tr>
                    <td>Glucides</td>
                    <td>{product?.nutriments?.carbohydrates} g</td>
                  </tr>
                  <tr>
                    <td>Sucre</td>
                    <td>{product?.nutriments?.sugars} g</td>
                  </tr>
                  <tr>
                    <td>Protéines</td>
                    <td>{product?.nutriments?.proteins} g</td>
                  </tr>
                  <tr>
                    <td>Sel</td>
                    <td>{product?.nutriments?.salt} g</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Details;
