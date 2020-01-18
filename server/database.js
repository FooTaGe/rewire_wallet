var fs = require('fs');

var database = loadDatabase();

function loadDatabase() {
    return require('./data.json');
}


module.exports = {
    getNames: function getNames(){
        var resp = [];
        for (const [key, value] of Object.entries(database.users)) {
            resp.push({name: key});
        }
        return resp;
    },
    
    getBalance: function getBalance(username){
        return database.users[username];
    },
    
    transfer: function transfer(sender, reciever, amount){
        if (!(database.users.hasOwnProperty(sender))) {
            return "Account does not exsist";
        }   
        if (!(database.users.hasOwnProperty(reciever))) {
            return "Reciever does not exsits";
        }
        if(database.users[sender].balance < amount) {
            return "Out of funds"
        }
    
        const timestamp = Date.now();
        database.users[sender].balance -= amount;    
        database.users[reciever].balance += amount;
        database.logs[timestamp] = {
            "sender" : sender,
            "reciever": reciever,
            "amount": amount
        }
        // not async
        fs.writeFileSync('data.json', JSON.stringify(database));
        return 0;
    }
  };