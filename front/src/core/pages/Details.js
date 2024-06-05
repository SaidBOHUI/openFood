import { useEffect, useState } from "react";
import { Card, ListGroup, Table } from "react-bootstrap";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useParams } from "react-router";
const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    console.log(id);
    axios
      .get(`/product/barcode/${id}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
  return (
    <Card key={product.id} style={{ width: "18rem" }}>
      <Card.Header>{product?.product_name}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>{product?.brands} </ListGroup.Item>
        <ListGroup.Item>{product?.nutrition_grades}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
export default Details;
