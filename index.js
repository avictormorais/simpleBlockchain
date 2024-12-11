const Blockchain = require('./blockchain');

let BLOCKCHAIN = new Blockchain();

BLOCKCHAIN.createTransaction('777x0000000001', '777x0000000002', 77, 2);
BLOCKCHAIN.createTransaction('777x000000ABCD', '777x0000000001', 777, 0);
BLOCKCHAIN.createTransaction('777x000000ABCD', '777x0000000002', -1, 1);
BLOCKCHAIN.newBlock('777x0000000001');

BLOCKCHAIN.createTransaction('777xF5A231CF98', '777x0000000001', 77, 3);
BLOCKCHAIN.createTransaction('777xTESTE', '777x0000000001', 7, 1);
BLOCKCHAIN.createTransaction('777x8F6A2017E2', '777x000000ABCD', 333, 4);
BLOCKCHAIN.createTransaction('777x2345F76899', '777x0000000011', 7, 1);
BLOCKCHAIN.createTransaction('777x2345F76899', '777x0000000002', 2, 1);
BLOCKCHAIN.createTransaction('777x0000000001', '777x00000000011', 7, 2);
BLOCKCHAIN.newBlock('777x0000000001');

BLOCKCHAIN.createTransaction('777x0000000001', '777x0000000005', 77, 2);
BLOCKCHAIN.newBlock('777x0000000001');

BLOCKCHAIN.printChain();

console.log(`\nA blockchain é válida? ${BLOCKCHAIN.isBlockchainValid() ? "Sim" : "Não"}`);

BLOCKCHAIN.transactionsByAddress('777x0000000001');
BLOCKCHAIN.transactionsByAddress('777x0000000002');