const express = require('express');
const router = express.Router();
const axios = require('axios');
 

router.get("/",async(req,res)=>{
    res.send('index.html');
})
 
router.post("/set_contac",async(req,res)=>{
        var name= req.body.contac
        const options = {
            headers: {
                'Authorization' : 'Bearer 07c9e697149175ee19cbc6cefad18d9ac05ea8d2',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Headers': 'x-access-token, Origin, X-Requested-With, Content-Type, Accept',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
             }
          };
          
          axios.post('https://api.softwareavanzado.world/index.php?webserviceClient=administrator&webserviceVersion=1.0.0&option=contact&api=hal',{"name":name}, options)
           .then((res) => {
             console.log("RESPONSE ==== : ", res);
           })
           .catch((err) => {
             console.log("ERROR: ====", err);
           })
        res.send("si lo mando");    
});

  module.exports = router;