const bitcoin = require('bitcoinjs-lib');
const fs = require('fs');
const bitcoinRPC  = require('./make_jsonRPC');
const BITCOIN_SV_NETWORKS = {
    messagePrefix: 'bsv testnet',
    bip32: {
        public: 0x043587cf,
        private: 0x04358394,
    },
    pubKeyHash: 0x6f,
    scriptHash: 0xc4,
    wif: 0xef,
};


var privKey = fs.readFileSync('./privKey');
//console.log(privKey);

const svKeyPair = bitcoin.ECPair.fromPrivateKey(privKey);
const svAddressMap = bitcoin.payments.p2pkh({ pubkey: svKeyPair.publicKey, network: BITCOIN_SV_NETWORKS });

//console.log(svKeyPair);
// console.log(svAddressMap);
//console.log(svAddressMap.address);


//faucet 받은 트랜잭션
var faucetObj =  '020000000183ec073b8e9005c3fb894aa989be0984b80a92eaadb307a462d0aeb049964f5b000000006a47304402200f8f56f1fcb7ef68616b9683311e08f6babd24cd9fee2375415774b39f73eeab02206e6d968a5916ac11907f7340980f3372b459da23adf3ce08579cc83e0069e8cb412102e80deefe8b11de1afe89d03f8fd1020688d4dd5e6a84fea830a6a8dc24dd9750feffffff029a352a02000000001976a91425ae89f394d21e34353392f806d451a74551d5f388ac404b4c00000000001976a914d537f0bc411bcdb0bfbeef79b24dd78764cd09df88ace7a31400';

var faucetTx = bitcoin.Transaction.fromHex('020000000183ec073b8e9005c3fb894aa989be0984b80a92eaadb307a462d0aeb049964f5b000000006a47304402200f8f56f1fcb7ef68616b9683311e08f6babd24cd9fee2375415774b39f73eeab02206e6d968a5916ac11907f7340980f3372b459da23adf3ce08579cc83e0069e8cb412102e80deefe8b11de1afe89d03f8fd1020688d4dd5e6a84fea830a6a8dc24dd9750feffffff029a352a02000000001976a91425ae89f394d21e34353392f806d451a74551d5f388ac404b4c00000000001976a914d537f0bc411bcdb0bfbeef79b24dd78764cd09df88ace7a31400');

// console.log(faucetTx);
var utxo = JSON.parse(fs.readFileSync('./UTXO'));
// console.log(utxo);

//트랜잭션 보내기
//받는 주소 : mtXSrvzzE7ABYttiH1zvNykaiQXXQWW7Ko

//0.01 BSV 전송 시
//input : 위에서 파싱한 utxo
//output : 해당 주소로 0.01
//       : fee를 제외한 나머지 약 0.3xxx 다시 내 주소로


//---------------------------------------------------------------------

const inputData1 = {
    hash: faucetTx.getId(),
    index: 1,
    nonWitnessUtxo:  Buffer.from(faucetObj, 'hex')
};

let txb = new bitcoin.Psbt({network:BITCOIN_SV_NETWORKS})
    .addInput(inputData1)
    .addOutput({
        address: 'mtXSrvzzE7ABYttiH1zvNykaiQXXQWW7Ko',
        value:1000000
    })
    .addOutput({
        address: svAddressMap.address,
        value:3900000
    })
    .signInput(0, svKeyPair,[0x01] )
    .signInput(0, svKeyPair,[0x40] );

txb.validateSignaturesOfInput(0);
txb.finalizeInput(0);

var extractedTx = txb.extractTransaction();
var extractedTxHex = extractedTx.toHex();

console.log(extractedTxHex);


/*
var request = bitcoinRPC.makeRPCRequest('sendrawtransaction', extractedTx);
var data = bitcoinRPC.receiveFromRequest(request)
*/





