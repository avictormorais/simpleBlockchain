class Transaction{

    constructor(sender, receiver, tokenAmount){
        this.sender = sender;
        this.receiver = receiver;
        this.tokenAmount = tokenAmount;
    }

}

module.exports = Transaction;