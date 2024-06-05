import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
const ListCategory = () => {
  //Liste de tous les produits
  const [productList, setProductList] = useState([]);
  const [filter, setFilter] = useState("");
  const [listCat, setListCat] = useState([]);

  //Etat de chargement, pour être sur que l'appel à l'API se fait avant l'affichage du tableau
  const [load, setLoad] = useState(true);

  useEffect(() => {
    axios
      .get("/product/categories")
      .then((res) => {
        console.log(res);
        setListCat(res.data.categories);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  useEffect(() => {
    if (filter != "") {
      setLoad(true);
      //Appel à l'API pour avoir la liste des produits
      axios
        .get("/product/alternatives", { categories: "confits-d-echalotes" })
        .then((resp) => {
          setProductList(resp.data);
          setLoad(false);
        })
        .catch((er) => {
          alert(er.message);
        });
    }
  }, [filter]);

  return (
    <>
      <div></div>
      <div>
        {load ? (
          <DropdownButton
            id="dropdown-basic-button"
            title={filter != "" ? filter : "Categories"}>
            {listCat.map((item) => (
              <Dropdown.Item
                key={item?.id}
                onClick={() => setFilter(item?.name)}>
                {item.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Equipement</th>
                <th>Image</th>
                <th>Stock disponible</th>
                <th>Prix par jour</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {productList?.map((produit) => (
                <tr key={produit.id}>
                  <td>{produit.nom}</td>
                  <td style={{ width: "10rem" }}>
                    <img
                      style={{ width: "10rem" }}
                      src={`/images/${produit.image}`}></img>
                  </td>
                  <td>{produit.stock_disponible}</td>
                  <td>{produit.prix_jour}€</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};
export default ListCategory;
