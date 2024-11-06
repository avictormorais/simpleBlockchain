const Block = require('./block');
const Transaction = require('./transaction');

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

module.exports = Blockchain;