import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigationbar from "./core/components/Navigationbar";
import MainRoutes from "./core/routes/MainRoutes";
import { AuthProvider } from "../src/core/context/authProvider"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigationbar />
        <MainRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
