const bitcoin = require('bitcoinjs-lib');
const fs = require('fs');



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

const svKeyPair = bitcoin.ECPair.makeRandom( { network: BITCOIN_SV_NETWORKS });

fs.writeFile('./privKey', svKeyPair.privateKey, (err) =>{
    if(err) {
        console.log(err)
    }
} )