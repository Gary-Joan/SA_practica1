const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("querystring");
//inicio del programa pagina index.html
router.get("/", async (req, res) => {
  res.send("index.html");
});
let token = {};

//Funcion que nos devuelve  el access._token para poder ser utuliizado despues en las authenticaciones necesarias
async function getauth() {
  var access_token = "";
  const data = qs.stringify({
    grant_type: "client_credentials",
    client_id: "sa",
    client_secret:
      "fb5089840031449f1a4bf2c91c2bd2261d5b2f122bd8754ffe23be17b107b8eb103b441de3771745",
  });
  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  };
  return await axios
    .post(
      "https://api.softwareavanzado.world/index.php?option=token&api=oauth2",
      data,
      options
    )
    .then((result) => {
      if (result) {
        return result.data.access_token;
      }
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
    });
}
//Aqui se ejecuta la insercion del contactocon sus respectivas credenciales de tipo Bearer
router.post("/set_contac", async (req, res) => {
  var name = req.body.contac;
  var tokenAuth = await getauth();
  const options = {
    headers: {
      Authorization: "Bearer " + tokenAuth,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "x-access-token, Origin, X-Requested-With, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    },
  };

  axios
    .post(
      "https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal",
      { name: name },
      options
    )
    .then((res) => {
      console.log("RESPONSE ==== : ", res);
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
    });

  res.send("Si lo mando");
});
//funcion que nos devuelve los contacto de la base de datos
async function getContactos() {
  var tokenAuth = await getauth();
  const options = {
    headers: {
      Authorization: "Bearer " + tokenAuth,
    },
  };
  return await axios
    .get(
      `https://api.softwareavanzado.world/index.php?option=com_contact&webserviceVersion=1.0.0&webserviceClient=administrator&filter[search]=200915609&api=hal`,
      options
    )
    .then((res) => {
      const persons = res.data._embedded.item;

      return persons;
      //aqui capturamos la lista de contactos y lo ponemos en el state del constructor
    })
    .catch((err) => {
      console.log("ERROR: ====", err);
    });
}
//aqui mostramos la lista de contactos en una nueva pagina
router.get("/listac", async function (req, res) {
  var contactos = await getContactos();
  res.render("listaC", { students: contactos });
});
module.exports = router;
