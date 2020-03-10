const bsv = require('bsv');



var privkey = new bsv.PrivateKey( 'aaaaaaaaaa', 'testnet');

console.log(privkey.publicKey.toAddress('testnet').toString());

var addr = privkey.publicKey.toAddress('testnet').toString();


var tx = new bsv.Transaction('02000000010f2669b7dfd652acf6571d6c23be147f51200683c7bef9bb610f9b6a7c0d6df6010000006b483045022100d717c2de46cffd8c925157360cbc913ea613dad59a4b532f74738cf208207a790220488d8a761cad6e477ddd2100e4af2780bcef12f461ba4520bc11ff012eee3285412102882244bf91df036687ecb8b4c87ab4644d688994c3fd40aca52d7d3fd3d3a934feffffff0200093d00000000001976a914bc38771441b222ce41b6223dda8a3647dc1c2b1c88ac625a3104000000001976a914a25da36ce8c677f79fe815583aad634eb12103a488acbea21400');

 console.log(tx)

 cons