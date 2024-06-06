//Routeur
import { Navigate, Route, Routes } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/authProvider";
import * as React from "react";
import Details from "../pages/Details";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import BackupPageProduit from "../pages/BackupPageProduit";
import AlternativesPage from "../pages/AlternativesPage";

const MainRoutes = () => {
  const [user, setUser] = useState(useAuth());

  return (
    <Routes>
      <Route path="/" element={<BackupPageProduit />} />
      <Route path="/produit/alternate/:id" element={<AlternativesPage />} />
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
      */}
      <Route path="/authentication" element={<LoginPage />}></Route>
      <Route path="/inscription" element={<SignupPage />}></Route>
      {/*<Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="404" replace />} />*/}
    </Routes>
  );
};

export default MainRoutes;
