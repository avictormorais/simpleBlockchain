const sha256 = require('js-sha256');

class Blockchain {

    constructor() {
        this.chain = [];
        this.Transactions = [];
        this.newBlock();
    }

    hash(block){
        let { hash, ...blockToHash } = block;
        return sha256(JSON.stringify(blockToHash));
    }

    getLastBlock(){
        return this.chain[this.chain.length-1]
    }

    newBlock(){
        let newBlock = {
            timestamp: Date.now(),
            transactions: this.Transactions,
            previousHash: this.getLastBlock() ? this.hash(this.getLastBlock()) : '0'
        }
        newBlock.hash = this.hash(newBlock)

        if(newBlock.previousHash !== (this.getLastBlock() ? this.getLastBlock().hash : '0')) {
            console.log(`Invalid block, previousHash invalid: ${newBlock.previousHash}`);
            return false;
        }

        if(newBlock.hash != this.hash(newBlock)){
            console.log(`Invalid block, hash invalid: ${newBlock.hash}`);
            return false;
        }

        this.chain.push(newBlock);
        this.Transactions = [];
        return newBlock;
    }

    createTransaction(sender, receiver, tokenAmount){
        this.Transactions.push({
            sender: sender,
            receiver: receiver,
            tokenAmount: tokenAmount
        })
    }

    isBlockchainValid(){
        for (let i = 1; i < this.chain.length; i++) {
            let currentBlock = this.chain[i];
            let previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== this.hash(currentBlock)) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

    printChain(){
        this.chain.forEach((block, i) => {
            console.log('-----------------------------------------------------------------------')
            console.log(`--                               Block ${i}                             --`)
            console.log(`- Hash ${block.hash}`)
            console.log(`- PreviousHash ${block.previousHash}`)
            console.log(`- Timestamp ${block.timestamp}`)
            if(block.transactions.length >=1){
                console.log(`  Transactions:`);
                block.transactions.forEach((transaction, i) => {
                    console.log(`  $ Transaction ${i+1} | ${transaction.sender} -> ${transaction.receiver}: ${transaction.tokenAmount}`);
                });                
            } else{
                console.log('- No transactions on this block')
            }
            console.log('-----------------------------------------------------------------------')
            if(i+1 != this.chain.length){
                console.log('                                   |                                   ')
            }
        })
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

console.log(`A blockchain é válida? ${BLOCKCHAIN.isBlockchainValid() ? "Sim" : "Não"}`)