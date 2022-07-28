import logo from "./logo.svg";
import "./App.css";
import { Button, Switch } from "@material-ui/core";
import SearchAppBar from "./complements/Navbar";
import Listas from "./complements/Listas";
import Ocultar from "./complements/Ocultar";
import Contenedor from "./complements/Contenedor";
import Cajon from "./complements/Cajon";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
  useParams,
} from "react-router-dom";
import theme from "./temaConfig.js";
import Historial from "./pages/Historial";
import { NotFound } from "./pages/NotFound";
// import { Clima } from "./complements/Clima";


function App() {
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes>
            
            <Route path="/historial" element={<Historial />} />

            {/* <Route path="/noticias" element={<Noticias />} />

            <Route path="/Clima" element={<Clima/>}/> */}
            
            <Route path="/:ciudad" element={<Contenedor />} />

            <Route index element={<Contenedor />} />
          </Routes>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
