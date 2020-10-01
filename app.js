const app = async () => {
    var Web3 = require('web3');
    var abi = require('./abi.json')
    // var web3 = new Web3('https://rinkeby.infura.io/v3/fc3763a3d64c4ca191a04aab5b340f15');
    var web3 = new Web3('http://192.168.1.59:8545');
    var contract = new web3.eth.Contract(abi, "0xBE1f8bE4004F09B63Bf22db0003863f8F08e147B")

    var Tx = require('ethereumjs-tx').Transaction;



    var data = contract.methods.transfer("0x568fb0BcB11C657231de28c589907a5a5e61A51c", 50).encodeABI();
    console.log(data);


    //0x68eC30CaC8841Cf487Df634a57bf68018D382a6D
    var privateKey = Buffer.from('20b51b9fba49f1756b61bc431155cffa4d95edcf0dc827ac8772159ffe121f73', 'hex');
    //0xAfA3a4e1a9beEC71221e71596A2cd3aa850F7A61

    var gp = web3.utils.toHex('25000000000')
    var gl = web3.utils.toHex('852229')

    var value = await web3.eth.getTransactionCount("0xAfA3a4e1a9beEC71221e71596A2cd3aa850F7A61")
    var nonce = web3.utils.toHex(value)
    var rawTx = {
        nonce: nonce,
        gasPrice: gp,
        gasLimit: gl,
        to: '0xBE1f8bE4004F09B63Bf22db0003863f8F08e147B',
        value: '0x00',
        data: data
    }

    // console.log(rawTx);
    // try {
    //     var res = await web3.eth.estimateGas(rawTx)
    //     console.log("result sini: "+res)
    // } catch (error) {
    //     console.log("error adalah: "+error);
    // }



    var tx = new Tx(rawTx, { 'chain': 'rinkeby' });
    // tx.sign(privateKey);

    var serializedTx = tx.serialize();

    // console.log(serializedTx.toString('hex'));
    // 0xf889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f

    // web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    //     .then(res => console.log(res));

    // var bal = await contract.methods.balances("0xAfA3a4e1a9beEC71221e71596A2cd3aa850F7A61").call()
    // console.log("belen: ", bal);

    web3.eth.getBlockNumber()
.then(console.log);



}

app()

