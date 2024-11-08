import React from "react";
import Button from "./components/Button"; // Importiere deine Button-Komponente
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import './App.css';

/*function App() {
    return (
        <div>
            <h1>Willkommen zur App!</h1>
            {/* Verwende den Button aus Button.jsx mit der color-Prop }
            /*
            <Button color="primary">Klicken</Button>
            <Button color="danger">Warnung</Button>
            <Button color="success">Erfolg</Button>
        </div>
    );
} */





function App() {
  return (
    <div>
      <Navbar />
      <SearchBar />
      <h1>Welcome to the catalog for EO ML models! <br></br>Have fun!</h1>
      {/* Weitere Komponenten oder Inhalte können hier hinzugefügt werden */}
    </div>

  );
}

export default App;
