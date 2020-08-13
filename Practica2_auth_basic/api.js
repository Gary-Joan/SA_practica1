const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("querystring");
var DOMParser = require("xmldom").DOMParser;
//inicio del programa pagina index.html
router.get("/", async (req, res) => {
  res.send("index.html");
});

//Funcion que nos devuelve  el access._token para poder ser utuliizado despues en las authenticaciones necesarias

//Aqui se ejecuta la insercion del contactocon sus respectivas credenciales de tipo Bearer
router.post("/set_contac", async (req, res) => {
  var name = req.body.contac;
  const options = {
    auth: {
      username: "sa",
      password: "usac",
    },
  };
  const data =
    '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:adm="https://api.softwareavanzado.world/media/redcore/webservices/joomla/administrator.contact.1.0.0.wsdl">\
  <soap:Header/>\
  <soap:Body>\
     <adm:create><name>' +
    name +
    "</name></adm:create>\
  </soap:Body>\
</soap:Envelope>";
  axios
    .post(
      "https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap",
      data,
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
  const options = {
    auth: {
      username: "sa",
      password: "usac",
    },
  };
  const data =
    '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:adm="https://api.softwareavanzado.world/media/redcore/webservices/joomla/administrator.contact.1.0.0.wsdl">\
  <soap:Header/>\
  <soap:Body>\
     <adm:readList>\
            <filterSearch>200915609</filterSearch>\
     </adm:readList>\
  </soap:Body>\
</soap:Envelope>';

  return await axios
    .post(
      `https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=soap`,
      data,
      options
    )
    .then((res) => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(res.data, "text/xml");
      return doc.documentElement.childNodes[0].childNodes[0].childNodes[0]; //
      //.childNodes[2].childNodes[4].childNodes[0].nodeValue;

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
