const sha256 = require('js-sha256');

class Block{

    constructor(timestamp, transactions, previousHash){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        let { hash, ...blockToHash } = this;
        return sha256(JSON.stringify(blockToHash));
    }

}

class Transaction{

    constructor(sender, receiver, tokenAmount){
        this.sender = sender;
        this.receiver = receiver;
        this.tokenAmount = tokenAmount;
    }

}

class Blockchain{

    constructor(){
        this.chain = [];
        this.Transactions = [];
        this.newBlock();
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    newBlock(){
        let newBlock = new Block(
            Date.now(),
            this.Transactions,
            this.getLastBlock() ? this.getLastBlock().hash : '0'
        );

        if(newBlock.previousHash !== (this.getLastBlock() ? this.getLastBlock().hash : '0')){
            console.log(`Invalid block, previousHash invalid: ${newBlock.previousHash}`);
            return false;
        }

        if(newBlock.hash != newBlock.calculateHash()){
            console.log(`Invalid block, hash invalid: ${newBlock.hash}`);
            return false;
        }

        this.chain.push(newBlock);
        this.Transactions = [];
        return newBlock;
    }

    createTransaction(sender, receiver, tokenAmount){
        this.Transactions.push(new Transaction(sender, receiver, tokenAmount));
    }

    isBlockchainValid(){
        for (let i = 1; i < this.chain.length; i++){
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }

    printChain(){
        this.chain.forEach((block, i) => {
            console.log('-----------------------------------------------------------------------');
            console.log(`--                               Block ${i}                             --`);
            console.log(`- Hash ${block.hash}`);
            console.log(`- PreviousHash ${block.previousHash}`);
            console.log(`- Timestamp ${block.timestamp}`);
            if(block.transactions.length >= 1){
                console.log(`  Transactions:`);
                block.transactions.forEach((transaction, i) => {
                    console.log(`  $ Transaction ${i + 1} | ${transaction.sender} -> ${transaction.receiver}: ${transaction.tokenAmount}`);
                });
            } else {
                console.log('- No transactions on this block');
            }
            console.log('-----------------------------------------------------------------------');
            if(i + 1 != this.chain.length){
                console.log('                                   |                                   ');
            }
        });
    }

}

let BLOCKCHAIN = new Blockchain();

// Criando transações com nomes em formato de String
BLOCKCHAIN.createTransaction("Davi", "Elias", 7)
BLOCKCHAIN.createTransaction("Elias", "Victor", 777)
BLOCKCHAIN.newBlock();

BLOCKCHAIN.createTransaction("Victor", "Wandreus", 777)
BLOCKCHAIN.createTransaction("Wandreus", "Bruno", 7)
BLOCKCHAIN.createTransaction("Wandreus", "Isac", 77)
BLOCKCHAIN.newBlock();

// Criando transações usando hash (simulando chaves)
BLOCKCHAIN.createTransaction(sha256("Isac"), sha256("Victor"), 77)
BLOCKCHAIN.newBlock();

BLOCKCHAIN.printChain()

// Imprimindo chain em formato JSON
// console.log(JSON.stringify(BLOCKCHAIN.chain));

console.log(`\n\nA blockchain é válida? ${BLOCKCHAIN.isBlockchainValid() ? "Sim" : "Não"}\n\n`)