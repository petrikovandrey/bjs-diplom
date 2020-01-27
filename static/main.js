class Profile {
    constructor(userName, name, password) {
        this.userName = userName;
        this.name = name;
        this.password = password;
    }

    createUser(callback) {
        console.log("I'm adding new user");
        return ApiConnector.createUser({ username: this.userName, name: this.name, password: this.password }, (err, data) => {
            console.log(`Added new user ${this.userName}`);
            callback(err, data);
        });
    }

    performLogin(callback) {
        console.log("Authorization...");
        return ApiConnector.performLogin({ username: this.userName, password: this.password }, (err, data) => {
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
    if (err) {
        console.log("Warning!");
        console.log(err);
    }
}

function getStocks() {

    ApiConnector.getStocks((err, data) => {
        if (err) {
            console.log("Warning");
            console.log(err);
        } else {
            console.log(data);
            return data;
        };
    });

}

function main() {
    console.log("what ?!");
    const Sumkin = new Profile("Sumkin", { firstName: "Frodo", lastName: "Baggins" }, "1234");
    // console.log("1" + Sumkin.userName);
    // console.log("2" + Sumkin.name);
    Sumkin.createUser(alertCollback);
    Sumkin.performLogin(alertCollback);

    const transferMoney = {
        currency: "RUB",
        amount: 100
    };

    Sumkin.addMoney(transferMoney, (err, data) => {
        if (err) {
            console.error(`Error during adding money to ${Sumkin.userName}`);
        } else {
            console.log(`Added ${transferMoney.amount} ${transferMoney.amount} to ${Sumkin.userName}`);
        }
    });
    const targetCurrency = "NETCOIN";
    const course = getTargetAmount(getStocks(), transferMoney.currency, targetCurrency, transferMoney.amount);
    console.log(course);
    const amount = transferMoney.amount * course;

    newUser.convertMoney({
        fromCurrency: transferMoney.currency,
        targetCurrency: targetCurrency,
        targetAmount: amount
    }, alertCollback);

    // const Senya = new Profile("Senya",{ firstName: "Sam", lastName: "Gamgee" }, "0987");

}

function getTargetAmount(rates, fromCurrency, targetCurrency, amount) {

    const textOfFind = targetCurrency + "_" + fromCurrency;
    const reverseTextOfFind = fromCurrency + "_" + targetCurrency;

    return rates
        .filter(item => item[reverseTextOfFind] === amount)
        .map(item => item[textOfFind])

}

console.log("it's works");
main();
