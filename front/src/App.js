import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navigationbar from "./core/components/Navigationbar";
import MainRoutes from "./core/routes/MainRoutes";

function App() {
  return (
    <BrowserRouter>
      <Navigationbar />
      <MainRoutes />
    </BrowserRouter>
  );
}

export default App;
