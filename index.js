const Blockchain = require('./blockchain');

let BLOCKCHAIN = new Blockchain();

BLOCKCHAIN.createTransaction('777x0000000001', '777x0000000002', 77);
BLOCKCHAIN.createTransaction('777x000000ABCD', '777x0000000001', 777);
BLOCKCHAIN.createTransaction('777x000000ABCD', '777x0000000002', -1);
BLOCKCHAIN.newBlock();

BLOCKCHAIN.createTransaction('777xF5A231CF98', '777x0000000001', 77);
BLOCKCHAIN.createTransaction('777xTESTE', '777x0000000001', 7);
BLOCKCHAIN.createTransaction('777x8F6A2017E2', '777x000000ABCD', 333);
BLOCKCHAIN.createTransaction('777x2345F76899', '777x0000000011', 7);
BLOCKCHAIN.createTransaction('777x0000000001', '777x00000000011', 7);
BLOCKCHAIN.newBlock();

BLOCKCHAIN.createTransaction('777x0000000001', '777x0000000002', 77);
BLOCKCHAIN.newBlock();

BLOCKCHAIN.printChain();

console.log(`\n\nA blockchain é válida? ${BLOCKCHAIN.isBlockchainValid() ? "Sim" : "Não"}\n\n`);