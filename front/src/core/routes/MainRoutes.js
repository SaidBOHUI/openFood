import { Navigate, Route, Routes } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/authProvider";
import * as React from "react";
import Details from "../pages/Details";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import BackupPageProduit from "../pages/BackupPageProduit";
import AlternativesPage from "../pages/AlternativesPage";
import SavedSubstitutesPage from "../pages/SavedSubstitutesPage"; 

const MainRoutes = () => {
  const [user, setUser] = useState(useAuth());

  return (
    <Routes>
      <Route path="/" element={<BackupPageProduit />} />
      <Route path="/produit/alternate/:id" element={<AlternativesPage />} />
      <Route path="/produits/:id" element={<Details />} />
      <Route path="/saved-substitutes" element={<SavedSubstitutesPage />} /> 
      <Route path="/authentication" element={<LoginPage />}></Route>
      <Route path="/inscription" element={<SignupPage />}></Route>
      {/*<Route path="404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="404" replace />} />*/}
    </Routes>
  );
};

export default MainRoutes;
