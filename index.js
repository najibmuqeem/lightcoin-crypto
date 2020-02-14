class Account {
  constructor() {
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let transaction of this.transactions) {
      balance += transaction.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    } else {
      return false;
    }
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return this.account.balance - this.amount >= 0;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account();

console.log("Starting Account Balance: ", myAccount.balance);

console.log("Withdrawing from an empty account...");
const t1 = new Withdrawal(1, myAccount);
console.log("Commit?", t1.commit());
console.log("Balance: ", myAccount.balance);

console.log("Depositing...");
const t2 = new Deposit(100, myAccount);
console.log("Commit?", t2.commit());
console.log("Balance: ", myAccount.balance);

console.log("Withdrawing...");
const t3 = new Withdrawal(50, myAccount);
console.log("Commit?", t3.commit());

console.log("Final balance: ", myAccount.balance);

console.log("Transaction History: ", myAccount.transactions);
