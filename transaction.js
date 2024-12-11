class Transaction{

    constructor(sender, receiver, tokenAmount, fee){
        this.sender = sender;
        this.receiver = receiver;
        this.tokenAmount = tokenAmount;
        this.fee = fee;
    }

}

module.exports = Transaction;