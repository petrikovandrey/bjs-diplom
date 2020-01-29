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
        console.log(`Convert ${fromCurrency} to ${targetCurrency}`);
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Your account is replenished ${targetAmount} ${targetCurrency}`);
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


function getTargetAmount(rates, fromCurrency, targetCurrency, amount) {

    const textOfFind = targetCurrency + "_" + fromCurrency;
    const reverseTextOfFind = fromCurrency + "_" + targetCurrency;
    const revRates = rates.reverse();
    const result = revRates.find(item => item[textOfFind] === amount);

    return result[reverseTextOfFind];
}

function getStocks(callback) {

    ApiConnector.getStocks((err, data) => {
        callback(err, data);
    });

}

function main() {

    const Sumkin = new Profile("Sumkin", { firstName: "Frodo", lastName: "Baggins" }, "1234");
    const Senya = new Profile("Senya", { firstName: "Sam", lastName: "Gamgee" }, "0987");

    Senya.createUser((err, data) => {
        if (err) {
            console.log(`Error message: (${err.code}) ${err.message}`);
        };
    });

    Sumkin.createUser((err, data) => {
        if (err) {
            console.log(`Error message: (${err.code}) ${err.message}`);
        } else if (data) {
            Sumkin.performLogin((err, data) => {
                if (err) {
                    console.log(`Error message: (${err.code}) ${err.message}`);
                } else if (data) {
                    const transferMoney = {
                        currency: "RUB",
                        amount: "100.000"
                    };
                    Sumkin.addMoney(transferMoney, (err, data) => {
                        if (err) {
                            console.log(`Error during adding money to ${Sumkin.username}`);
                            console.log(`Error message: (${err.code}) ${err.message}`);
                        } else if (data) {
                            getStocks((err, data) => {
                                if (err) {
                                    console.log(`Error message: (${err.code}) ${err.message}`);
                                } else if (data) {
                                    const targetCurrency = "NETCOIN";
                                    const course = getTargetAmount(data, 
                                        transferMoney.currency, 
                                        targetCurrency, 
                                        transferMoney.amount);
                                    const amount = transferMoney.amount * course;

                                    console.log(`${amount} = ${transferMoney.amount} * ${course}`);

                                    Sumkin.convertMoney({
                                        fromCurrency: transferMoney.currency,
                                        targetCurrency: targetCurrency,
                                        targetAmount: amount
                                    }, (err, data) => {
                                        if (err) {
                                            console.log(`Error message: (${err.code}) ${err.message}`);
                                        } else if (data) {
                                            Sumkin.transferMoney({ to: Senya.username, amount: amount }, (err, data) => {
                                                console.log("the end");
                                            });
                                        };
                                    });
                                };
                            });

                        };
                    });
                };
            });
        };
    });
}


main();
