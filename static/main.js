class Profile {
    constructor(userName, name, password) {
        this.userName = userName;
        this.name = name;
        this.password = password;
    }

    createUser(callback) {
        console.log("I'm adding new user");
        return ApiConnector.createUser(this, (err, data) => {
            console.log(`Added new user ${this.userName}`);
            callback(err, data);
        });
    }

    performLogin(callback) {
        console.log("Authorization...");
        return ApiConnector.performLogin(this, (err, data) => {
            console.log(`Hello, ${this.userName}!`);
            callback(err, data);
        });
    }

    addMoney({ currency, amount }, callback) {
        console.log(`Adding ${amount} of ${currency} to ${this.username}`);
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Added ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        console.log(`Convert ${fromCurrency} to ${targetCurrency} = ${targetAmount}`);
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Your account is replenished ${amount} ${currency}`);
            callback(err, data);
        });
    }

    transferMoney({ to, amount }, callback) {
        console.log(`Transferring ${amount} to ${to}`);
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Done.  ${to} got transfer`);
            callback(err, data);
        });
    }

}

function alertCollback(err, data) {
    console.log(err);
}

function getStocks() {

    let rates = ApiConnector.getStocks(alertCollback);
    return rates;
}

console.log(getStocks());

function main() {
    const newUser = new Profile("Sumkin", { firstName: "Frodo", lastName: "Baggins" }, "1234");
    const newUserTwo = new Profile("Senya", { firstName: "Sam", lastName: "Gamgee" }, "0987");
    newUser.createUser(alertCollback);
    newUser.performLogin(alertCollback);
    newUser.addMoney({ currency: "USD", amount: "100" }, alertCollback);

    const rates = getStocks();

    newUser.convertMoney({ fromCurrency: "USD", targetCurrency: "Netcoin", targetAmount: amount }, alertCollback);


    newUserTwo.createUser(alertCollback);

}