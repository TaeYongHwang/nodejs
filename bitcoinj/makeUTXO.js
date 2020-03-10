const bitcoin = require('bitcoinjs-lib');
const fs = require('fs');


//faucet 받은 트랜잭션
var faucetTx = bitcoin.Transaction.fromHex('020000000183ec073b8e9005c3fb894aa989be0984b80a92eaadb307a462d0aeb049964f5b000000006a47304402200f8f56f1fcb7ef68616b9683311e08f6babd24cd9fee2375415774b39f73eeab02206e6d968a5916ac11907f7340980f3372b459da23adf3ce08579cc83e0069e8cb412102e80deefe8b11de1afe89d03f8fd1020688d4dd5e6a84fea830a6a8dc24dd9750feffffff029a352a02000000001976a91425ae89f394d21e34353392f806d451a74551d5f388ac404b4c00000000001976a914d537f0bc411bcdb0bfbeef79b24dd78764cd09df88ace7a31400');


fs.writeFile('./UTXO', JSON.stringify(faucetTx.outs[1]), (err) =>{
    if(err) {
        console.log(err)
    }
} )
