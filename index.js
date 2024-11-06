const Blockchain = require('./blockchain');
const sha256 = require('js-sha256');

let BLOCKCHAIN = new Blockchain();

BLOCKCHAIN.createTransaction("Davi", "Elias", 7);
BLOCKCHAIN.createTransaction("Elias", "Victor", 777);
BLOCKCHAIN.newBlock();

BLOCKCHAIN.createTransaction("Victor", "Wandreus", 777);
BLOCKCHAIN.createTransaction("Wandreus", "Bruno", 7);
BLOCKCHAIN.createTransaction("Wandreus", "Isac", 77);
BLOCKCHAIN.newBlock();

BLOCKCHAIN.createTransaction(sha256("Isac"), sha256("Victor"), 77);
BLOCKCHAIN.newBlock();

BLOCKCHAIN.printChain();

console.log(`\n\nA blockchain é válida? ${BLOCKCHAIN.isBlockchainValid() ? "Sim" : "Não"}\n\n`);