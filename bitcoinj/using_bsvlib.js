const bsv = require('bsv');
const fs = require('fs');
const Script = bsv.Script;

/*
// faucet txid : 23e604789f34ead670afeb2884738ae4f2131f04d8c927a32bb7823bb9310384
// cur address : mxgAyPKswTRGc5Z19RigbRpjGAmZ5uQFhH
//받는 주소 : mtXSrvzzE7ABYttiH1zvNykaiQXXQWW7Ko
 */
//console.log(privkey.toString());
//console.log(privkey.publicKey.toAddress('testnet').toString());
//console.log(addr);

var privkey = new bsv.PrivateKey( 'aaaaaaaaaa', 'testnet');
var addr = privkey.publicKey.toAddress('testnet').toString();


var utxo = JSON.parse(fs.readFileSync('./UTXO'));
var inputData = {
 address: utxo.address,
 txId: utxo.txId,
 outputIndex: utxo.outputIndex,
 script: new Script(privkey.publicKey.toAddress('testnet')),
 satoshis: utxo.satoshis
};


/*
// 1. P2PKH raw transaction을 만드는 부분
// 결과 트랜잭션 id : f269e5eb312ee8eef225d9b5a483dc8b80e0576f7dd6fa0411cc6f5211d448a8

 */
/*
var tempTx = new bsv.Transaction()
    .from(inputData)
    .to([{
     address: 'mtXSrvzzE7ABYttiH1zvNykaiQXXQWW7Ko',
     satoshis: 1000000
    } ,
     {
      address : 'mxgAyPKswTRGc5Z19RigbRpjGAmZ5uQFhH',
      satoshis : 2900000
     }
    ])
    .change('mxgAyPKswTRGc5Z19RigbRpjGAmZ5uQFhH')
    .sign(privkey);

console.log(tempTx.serialize()); //해당 값을 cli로 네트워크상에 전파시킴 (sendrawtransaction 이용함)
*/


/*
    2. P2SH  rawTransaction 만드는 부분

 */

//P2SH address 만들기
//address : 2Mx7jaDZV9Tdie49tq8KCAc7jgYkahf45zs
//결과 txid : 2023624c814a7c1f15991b67bff90d3bf56b13930eed8e5337795487600d0282
var p2shAddr = bsv.Address.createMultisig([privkey.toPublicKey()], 1, 'testnet');

inputData = {
 address: 'mxgAyPKswTRGc5Z19RigbRpjGAmZ5uQFhH',
 txId: 'f269e5eb312ee8eef225d9b5a483dc8b80e0576f7dd6fa0411cc6f5211d448a8',
 outputIndex: 1,
 script: new Script(privkey.publicKey.toAddress('testnet')),
 satoshis: 2900000
};


var tempTx = new bsv.Transaction()
    .from(inputData)
    .to([{
     address: '2Mx7jaDZV9Tdie49tq8KCAc7jgYkahf45zs',
     satoshis: 1000000
    } ,
     {
      address : 'mxgAyPKswTRGc5Z19RigbRpjGAmZ5uQFhH',
      satoshis : 1800000
     }
    ])
    .change('mxgAyPKswTRGc5Z19RigbRpjGAmZ5uQFhH')
    .sign(privkey);

console.log(tempTx.serialize());





//segwit address 만들기












