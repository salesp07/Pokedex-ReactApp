import 'bootstrap/dist/css/bootstrap.min.css';
import './components/styles.css'
import { Route, Routes } from "react-router-dom";
import Pokemons from "./routes/Pokemons";
import Login from "./routes/Login";
import Register from './routes/Register';
import Admin from './routes/Admin';

function App() {

  return (
    <Routes>
      <Route path="/pokemons" element={<Pokemons/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path='*' element={<h1>404: Not Found</h1>} />
    </Routes>
  );
}

export default App;
