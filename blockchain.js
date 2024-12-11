const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain{
    constructor(){
        this.chain = [];
        this.Transactions = [];
        this.difficulty = 5;
        this.miningReward = 5;
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
        let regexAddress = /^777x[a-fA-F0-9]{10}$/;
        return regexAddress.test(address);
    }

    transactionsByAddress(address){
        let transactions = [];

        this.chain.forEach((block) => {
            block.transactions.forEach((transaction) => {
                if(transaction.sender == address || transaction.receiver == address){
                    transactions.push({ 
                        blockHash: block.hash,
                        transaction
                    });                   
                }
            })
        })

        if(transactions.length > 0){
            console.log('\n----------------------------------------')
            console.log(` Transactions for address ${address}`)
            transactions.forEach((item) => {
                let { transaction, blockHash } = item;   
                let received = transaction.sender === address ? false : true
                console.log(` - $ ${received ? '<-' : '->'} ${transaction.tokenAmount} ${received ? 'received from' : 'sent to'} ${received ? transaction.sender || 'blockchain as mining reward' : transaction.receiver}, registered on block ${blockHash}`);            })
            console.log('----------------------------------------')
        } else{
            console.log(`\n! No transactions recorded for address ${address}.`)
        }
    }

    newBlock(minerAddress){
        let nonce = 0;
        let previousHash = this.getLastBlock().hash;
        let hash;
        let transactionsToMine = this.Transactions
            .sort((a, b) => b.fee - a.fee)
            .slice(0, 3);
        let totalFees = this.Transactions.reduce((sum, tx) => sum + (tx.fee || 0), 0);
        let rewardTransaction = new Transaction(null, minerAddress, this.miningReward + totalFees, 0);
        this.Transactions = this.Transactions.filter(tx => !transactionsToMine.includes(tx));
        transactionsToMine.push(rewardTransaction);
    
        while (true) {
            let newBlock = new Block(Date.now(), transactionsToMine, previousHash, nonce);
            hash = newBlock.hash;
    
            if (hash.substring(0, this.difficulty) === Array(this.difficulty + 1).join("0")) {
                this.chain.push(newBlock);
                console.log(`✅ Mined block (${new Date().toLocaleTimeString()}) > Hash: ${hash} nonce: ${nonce}`);
                return newBlock;
            }
            nonce++;
        }
    }

    createTransaction(sender, receiver, tokenAmount, fee){
        if(this.isValidAddress(sender) && this.isValidAddress(receiver)){
            if(tokenAmount > 0){
                if(fee > 0){
                    this.Transactions.push(new Transaction(sender, receiver, tokenAmount, fee));
                } else{
                    console.error(`❌ ERROR - Invalid fee (${fee}), transaction refused.`);
                }
            } else{
                console.error(`❌ ERROR - Invalid token amount (${tokenAmount}), transaction refused.`);
            }
        } else {
            if(!this.isValidAddress(sender)){
                console.error("❌ ERROR - sender invalid address, transaction refused. |", sender);
            } else{
                console.error("❌ ERROR - receiver invalid address, transaction refused. | ", receiver);
            }
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
        console.log('\n')
        this.chain.forEach((block, i) => {
            console.log('-----------------------------------------------------------------------');
            console.log(`--                               Block ${i}                             --`);
            console.log(`- Hash ${block.hash}`);
            console.log(`- PreviousHash ${block.previousHash}`);
            console.log(`- Timestamp ${block.timestamp}`);
            if(block.transactions.length >= 1){
                console.log(`  Transactions:`);
                block.transactions.forEach((transaction, i) => {
                    if(!transaction.sender){
                        console.log(`\n  $ Reward | -> ${transaction.receiver}: ${transaction.tokenAmount}`)
                    } else{
                        console.log(`  $ Transaction ${i + 1} | ${transaction.sender} -> ${transaction.receiver}: ${transaction.tokenAmount} (Fee: ${transaction.fee})`)
                    }
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