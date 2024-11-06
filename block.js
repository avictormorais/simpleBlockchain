const sha256 = require('js-sha256');

class Block{

    constructor(timestamp, transactions, previousHash, nonce){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = nonce;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        let { hash, ...blockToHash } = this;
        return sha256(JSON.stringify(blockToHash));
    }

}

module.exports = Block;