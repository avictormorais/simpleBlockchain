class Node {
    constructor(blockchain){
        this.blockchain = blockchain;
        this.peers = [];
    }

    connect(node){
        if(!this.peers.includes(node)){
            this.peers.push(node);
            node.connect(this);
        }
    }

    async mineBlock(minerAddress){
        this.blockchain.updateBalances();
        let block = await this.blockchain.newBlock(minerAddress);

        this.peers.forEach(peer => {
            if(!peer.blockchain.chain.some(bk => bk.hash === block.hash)){
                peer.blockchain.chain.push(block);
                peer.blockchain.updateBalances();
            }
        });
    }

    async createTransaction(sender, receiver, tokenAmount, fee){
        let transaction = await this.blockchain.createTransaction(sender, receiver, tokenAmount, fee)

        if(transaction){
            this.peers.forEach(peer => {
                if(!peer.blockchain.Transactions.some(transac => JSON.stringify(transac) === JSON.stringify(transaction))){
                    peer.blockchain.Transactions.push(transaction);
                }
            });
        }
    }
}

module.exports = Node;