const Node = require('./node');
const Blockchain = require('./blockchain')

let blockchain = new Blockchain()

let node1 = new Node(blockchain);
let node2 = new Node(blockchain);
let node3 = new Node(blockchain);

node1.connect(node2);
node1.connect(node3);

node1.createTransaction('777xaa', '777x0000000002', 10, 0.5);
node1.createTransaction('777x0000000001', '777x0000000002', -5, 0.1);
node1.createTransaction('777x0000000001', '777x0000000002', 5, -2);
node2.mineBlock('777x0000000002');

node1.createTransaction('777x0000000001', '777x0000000003', 10, 0.5);
node1.createTransaction('777x0000000004', '777x0000000002', 10, 0.3);
node3.mineBlock('777x0000000001');

node1.createTransaction('777x0000000002', '777x0000000005', 7, 0.2);
node1.createTransaction('777x0000000005', '777x0000000001', 5, 0.1);
node3.mineBlock('777x0000000001');

node1.createTransaction('777x0000000001', '777x0000000003', 5, 0.3);
node1.createTransaction('777x0000000005', '777x0000000002', 20, 0.5);
node2.mineBlock('777x0000000001');

console.log(`\nBlockchain do nó 1 válida? ${node1.blockchain.isBlockchainValid() ? "Sim" : "Não"}`);
console.log(`Blockchain do nó 2 válida? ${node2.blockchain.isBlockchainValid() ? "Sim" : "Não"}`);
console.log(`Blockchain do nó 3 válida? ${node3.blockchain.isBlockchainValid() ? "Sim" : "Não"}`);

node1.blockchain.transactionsByAddress('777x0000000002');
console.log(`Saldo para endereço 777x0000000002 no nó 1: ${node1.blockchain.getAddressBalance('777x0000000002')}`);
console.log(`Saldo para endereço 777x0000000002 no nó 2: ${node2.blockchain.getAddressBalance('777x0000000002')}`);
console.log(`Saldo para endereço 777x0000000002 no nó 3: ${node3.blockchain.getAddressBalance('777x0000000002')}`);

// console.log(node1.blockchain)
// console.log(node2.blockchain)
// console.log(node3.blockchain)