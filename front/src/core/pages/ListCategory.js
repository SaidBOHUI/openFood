import { useState } from "react";
const ListCategory = () => {
  //Liste de tous les produits
  const [productList, setProductList] = useState([]);
  onst[(filter, setFilter)] = useState("");

  //Etat de chargement, pour être sur que l'appel à l'API se fait avant l'affichage du tableau
  const [load, setLoad] = useState(true);

  //Etat de l'état, qu'on mettra à jour dans le SessionStorage
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setLoad(true);
    //Appel à l'API pour avoir la liste des produits
    axios
      .get("/product/alternatives")
      .then((resp) => {
        setProductList(resp.data);
        setLoad(false);
      })
      .catch((er) => {
        alert(er.message);
      });
  }, [filter]);

  return (
    <>
      <div></div>
      <div>
        {load ? (
          <h1>Chargement...</h1>
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
