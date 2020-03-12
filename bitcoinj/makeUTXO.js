const bsv = require('bsv');
const Script = bsv.Script;
const fs = require('fs');
const models = require("./models/index.js");

//(test용)-------------------------
var privkey = new bsv.PrivateKey( 'aaaaaaaaaa', 'testnet');
var txHex = '0100000001840331b93b82b72ba327c9d8041f13f2e48a738428ebaf70d6ea349f7804e623000000006b483045022100cdc251985d2a1174225123cacd704fe22654ddb0793bc0336e4de93f25d529710220589a31b9ce13c30463e95494d13616d50ff808729bbf81a42551a74d5a267f58412103b29947c48fff7618cc748ea85d7cfb84fc216831225fdb19fe5e40e6af1eace6ffffffff0340420f00000000001976a9148eb17b4a478c595024275938c3d978309e4045e188ac20402c00000000001976a914bc38771441b222ce41b6223dda8a3647dc1c2b1c88ac9c850100000000001976a914bc38771441b222ce41b6223dda8a3647dc1c2b1c88ac00000000';
var addr = privkey.publicKey.toAddress('testnet').toString();
//---------------------------------


/*
    txHex로 넘어온 트랜잭션의 output에 대해서
    그 중 addr와 같은 address를 갖는 utxo를 데이터베이스 상에 저장한다.
 */
saveUTXOs = function(addr, txHex){
    var tx = new bsv.Transaction(txHex);

    tx.outputs.forEach(function(item, index){
        if(addr == item.script.toAddress('testnet').toString()){
            var utxo ={
                address : item.script.toAddress('testnet').toString(),
                txId: tx.id,
                satoshis : item.satoshis,
                outputIndex: index,
                isSpent: 0
            }
            console.log(utxo);

            models.UTXOs.create({
                address: utxo.address,
                txId: utxo.txId,
                outputIndex: utxo.outputIndex,
                satoshis: utxo.satoshis,
                isSpent : utxo.isSpent
            })
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    });
}


/*
    txHex로 넘어온 트랜잭션의 input에 대해서
    그 중 addr와 같은 address를 갖을 때,
    address, txid, outputIndex가 같은 튜플의 isSpent필드값을 1로 바꿔준다. (사용했으므로)
 */

spendUTXOs = function(addr, txHex){
    var tx = new bsv.Transaction(txHex);

    tx.inputs.forEach(function(item, index){
        if(addr == item.script.toAddress('testnet').toString()){
            var utxo ={
                address : item.script.toAddress('testnet').toString(),
                txId: item.prevTxId.toString('hex'),
                outputIndex: item.outputIndex,
                isSpent: 1
            }
            console.log(utxo);

            models.UTXOs.update(
                {isSpent : utxo.isSpent}
                ,{where: {
                    address : utxo.address,
                    txId: utxo.txId,
                    outputIndex: utxo.outputIndex
                }})
                .then(result => {
                   console.log(result);
                })
                .catch(err => {
                    console.log(err);
                });

        }
    });


}

//saveUTXOs(addr,'0200000001a2298cd5e692236272ac7b9775c0d31e2e8a4781483b0ac57facc11b26577551010000006a473044022069f2a8fa346f1ad6ab5449f9255696496915120ba0257e54a680ee1bff551ab202204d20c0ddbbc8cb390c5f3b450629fffae845e4c53bdb9b8c7bdc4a2aca49a28841210234c6317eaa5a1b3cac876dddd95b760743237b6f3f91cc74e8d6176818c0cf7dfeffffff0200093d00000000001976a914bc38771441b222ce41b6223dda8a3647dc1c2b1c88acf6ba4f04000000001976a91494ace918f40b879c4f0d63f5a3058700c865215188ac35a51400' );
//spendUTXOs(addr, txHex);
saveUTXOs(addr, txHex);

module.exports = {
    saveUTXOs,
    spendUTXOs
};




/*
var utxo = {
    address: 'mxgAyPKswTRGc5Z19RigbRpjGAmZ5uQFhH',
    txId: '23e604789f34ead670afeb2884738ae4f2131f04d8c927a32bb7823bb9310384',
    outputIndex: 0,
    satoshis: 4000000
};
 */

/*
//파일에저장시 사용했었음
fs.writeFile('./UTXO', JSON.stringify(uxto), (err) =>{
    if(err) {
        console.log(err)
    }
} )
*/