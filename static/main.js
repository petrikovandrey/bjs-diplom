class Profile {
    constructor(username, name, password) {
        this.username = username;
        this.name = name;
        this.password = password;
    }

    createUser(callback) {
        console.log("I'm adding new user");
        return ApiConnector.createUser({ username: this.username, name: this.name, password: this.password }, (err, data) => {
            console.log(`Added new user ${this.username}`);
            callback(err, data);
        });
    }

    performLogin(callback) {
        console.log("Authorization...");
        return ApiConnector.performLogin({ username: this.username, password: this.password }, (err, data) => {
            console.log(`Welcome, ${this.username}!`);
            callback(err, data);
        });
    }

    addMoney({ currency, amount }, callback) {
        console.log(`Adding ${amount} of ${currency} to ${this.username}`);
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Done. ${amount} ${currency} for ${this.username}`);
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
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Done.  ${to} got transfer`);
            callback(err, data);
        });
    }

}

function alertCollback(err) {
    if (err) {
        console.log(`Error message: (${err.code}) ${err.message}`);
        return err;
    }
}

function getTargetAmount(rates, fromCurrency, targetCurrency, amount) {

    const textOfFind = targetCurrency + "_" + fromCurrency;
    const reverseTextOfFind = fromCurrency + "_" + targetCurrency;

    return rates
        .filter(item => item[reverseTextOfFind] === amount)
        .map(item => item[textOfFind])
}

function getStocks() {

    ApiConnector.getStocks((err, data) => {
        if (err) {
            console.log(`Error message: (${err.code}) ${err.message}`);
        } else {
            return data;
        };
    });

}

function main() {

    const Sumkin = new Profile("Sumkin", { firstName: "Frodo", lastName: "Baggins" }, "1234");
    Sumkin.createUser(alertCollback);
    
    setTimeout(() => {
        Sumkin.performLogin(alertCollback);
    }, 2000);

    const transferMoney = {
        currency: "RUB",
        amount: 100
    };
    
    setTimeout(() => {
        Sumkin.addMoney(transferMoney, (err, data) => {
            if (err) {
                console.log(`Error during adding money to ${Sumkin.username}`);
            }
        });

    }, 4000);


    // const targetCurrency = "NETCOIN";
    // const course = getTargetAmount(getStocks(), transferMoney.currency, targetCurrency, transferMoney.amount);
    // const amount = transferMoney.amount * course;
    // console.log(amount);

    // setTimeout(() => {
    //     Sumkin.convertMoney({
    //         fromCurrency: transferMoney.currency,
    //         targetCurrency: targetCurrency,
    //         targetAmount: amount
    //     }, alertCollback);

    // }, 6000);

    // const Senya = new Profile("Senya", { firstName: "Sam", lastName: "Gamgee" }, "0987");
    // setTimeout(() => {
    //     Sumkin.transferMoney({ Senya, amount }, alertCollback);
    // }, 8000);

}


main();
