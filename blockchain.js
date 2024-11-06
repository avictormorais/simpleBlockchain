const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain{

    constructor(){
        this.chain = [];
        this.Transactions = [];
        this.difficulty = 5
        this.createGenesis();
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    createGenesis(){
        let genesisBlock = new Block(Date.now(), [], "0", 0);
        this.chain.push(genesisBlock);
    }

    isValidAddress(address) {
        let regexAdress = /^777x[a-fA-F0-9]{10}$/;
        return regexAdress.test(address);
    }

    newBlock(){
        let nonce = 0;
        let previousHash = this.getLastBlock().hash;
        let hash;

        while (true) {
            let newBlock = new Block(Date.now(), this.Transactions, previousHash, nonce);
            hash = newBlock.hash;

            if (hash.substring(0, this.difficulty) === Array(this.difficulty + 1).join("0")) {
                this.chain.push(newBlock);
                this.Transactions = [];
                console.log(`${new Date().toLocaleString()} > Bloco minerado: ${hash} com nonce: ${nonce}`);
                return newBlock;
            }
            nonce++;
        }
    }

    createTransaction(sender, receiver, tokenAmount) {
        if(this.isValidAddress(sender) && this.isValidAddress(receiver)){
            if(tokenAmount > 0){
                this.Transactions.push(new Transaction(sender, receiver, tokenAmount));
            } else{
                console.error(`X - Quantia de tokens inválida (${tokenAmount}), transação recusada.`);
            }
        } else {
            console.error("X - Um ou ambos os endereços são inválidos, transação recusada. | " + sender, receiver);
        }
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

module.exports = Blockchain;