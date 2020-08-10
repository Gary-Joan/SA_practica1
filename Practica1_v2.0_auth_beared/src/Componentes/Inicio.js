import axios from "axios";
import qs from "qs";
import React, { Component } from "react";

class Inicio extends Component {
  constructor() {
    super();

    // aqui inicializamos el constructor del state para poder llamarlo
    this.state = {
      nombre: "",
      contactos: [],
      access_token: "",
    };

    this.publish = this.publish.bind(this); // vinculadores de eventos para ser llamados
    this.getauth = this.getauth.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({ nombre: event.target.value }); // aqui manejamos el seteo del state para el valor del contacto
  };
  //La funcion publish sirve para enviar el contacto hacia la api en forma de JSON
  //Aqui pondriamos las credenciales para poder consumir el recurso y obtener la llave
  getauth() {
    var request = require("request");
    var jo;
    const data = qs.stringify({
      grant_type: "client_credentials",
      client_id: "sa",
      client_secret:
        "fb5089840031449f1a4bf2c91c2bd2261d5b2f122bd8754ffe23be17b107b8eb103b441de3771745",
    });
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    };
    axios
      .post(
        "https://api.softwareavanzado.world/index.php?option=token&api=oauth2",
        data,
        headers
      )
      .then((result) => {
        if (result) {
          this.setState({ access_token: result.data.access_token });
        }
      });
  }

  publish() {
    var token= "Bearer " + this.state.access_token;
    console.log(token);
    console.log(this.state.nombre);
    const data = JSON.stringify({
      name: this.state.nombre

    });
    const headers = {
       'Authorization' : "Bearer 4a707a1ec7f49256d55e05536639ba9eb9809a0d",
       'Content-Type' :'application/hal+json; charset=UTF-8',
       

    };
    axios.post(
        "https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal",
      data,
      headers
    )
      .then(function (response) {
        console.log(response); //aqui nos responde si todo salio bien
      })
      .catch(function (error) {
        console.log(error); //reponde con el error que mando la api
      });
    this.setState({ nombre: "" }); // seteamos el valor de input para seguir agregando mas conctactos
  }
  //funcion que nos la la lista de contactos que seran listados y mostrados
  componentDidMount() {
    this.getauth();

    // axios
    //   .get(
    //     `https://api.softwareavanzado.world/index.php?option=com_contact&webserviceVersion=1.0.0&webserviceClient=administrator&filter[search]=200915609&api=hal`
    //   )
    //   .then((res) => {
    //     const persons = res.data._embedded.item;

    //     this.setState({ contactos: persons }); //aqui capturamos la lista de contactos y lo ponemos en el state del constructor
    //   });
  }
  //aqui solo muestra el resultado final del html
  render() {
    return (
      <div className="manage-app">
        <h1>Practica 1 SA 200915609</h1>
        <form>
          <p>Nombre Contacto:</p>
          <input
            type="text"
            name="contactos"
            value={this.state.nombre}
            onChange={this.handleChange}
          />
          <br></br>
        </form>
        <button value="enviar" onClick={this.publish}>
          Agregar Contacto
        </button>
        <ul>
          {this.state.contactos.map((contact) => (
            <li>{contact.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Inicio;
