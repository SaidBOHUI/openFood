import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useParams } from "react-router";
const Details = () => {
  const { id } = useParams;
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .get(`/product/barcode/${id}`)
      .then((res) => {
        console.log(res);
        setProduct(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [product]);
  return (
    <Card key={product.id} style={{ width: "18rem" }}>
      <Card.Header>{product?.model}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>Prix : {product?.price} €</ListGroup.Item>
        <ListGroup.Item>
          Date de circulation : {product?.dateOfCirculation}
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};
export default Details;
