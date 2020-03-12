const models = require("./models/index.js");
const makeUTXO = require("./makeUTXO");



/*
models.sequelize.sync().then( () => {
    console.log(" DB 연결 성공");

}).catch(err => {
    console.log("연결 실패");
    console.log(err);
})
*/




//findAll
models.UTXOs.findAll()
    .then( results =>{
        console.log(results);
        }

    )
    .catch(err => {
        console.log(err);
    });



