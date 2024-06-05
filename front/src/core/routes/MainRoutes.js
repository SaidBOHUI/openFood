//Routeur
import { Navigate, Route, Routes } from "react-router";
import Home from "../pages/Home";
import { useState } from "react";
import { useAuth } from "../context/authProvider";
import * as React from "react";
import Details from "../pages/Details";

const MainRoutes = () => {
  const [user, setUser] = useState(useAuth());

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produits/:id" element={<Details />} />
      {/*<Route path="/produits/:id">
        <Route index caseSensitive element={<ListProduits />} />
        <Route path="theme/:theme" element={<ThemeProduit />} />
        {user !== undefined && user !== null && user.role === "admin" ? (
          <>
            <Route path="update/:id" element={<UpdateProduit />} />
            <Route path="add" element={<AddProduit />} />
          </>
        ) : (
          ""
        )}
      </Route>
      <Route path="/panier" element={<Panier />} />
      <Route path="/authentication" element={<Login />}></Route>
      <Route path="/inscription" element={<Register />}></Route>
      <Route path="404" element={<NotFound />} />
    <Route path="*" element={<Navigate to="404" replace />} />*/}
    </Routes>
  );
};

export default MainRoutes;
