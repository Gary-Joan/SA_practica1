const express = require("express");
const router = express.Router();
const axios = require("axios");
const qs = require("querystring");

router.get("/", async (req, res) => {
  res.send("index.html");
});
let token = {};
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
router.get('/listac', function(req, res, next) {
  
  var data = {studentList: ["Johnson", "Mary", "Peter", "Chin-su"]};
  res.render('listaC', {students: data});
})
module.exports = router;
