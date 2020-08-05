import React, { Component } from 'react';
import './App.css';
import Inicio from './Componentes/Inicio.js';

class App extends Component {
  //Aqui mandamos a llamar al componente INICIO que sera mostrado
  render() {
    return (
      
      <div className="App">
           <br></br>
           <Inicio />
           
      </div>
    );
  }
}

export default App;
