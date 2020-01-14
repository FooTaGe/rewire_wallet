var fs = require('fs');

var database = loadDatabase();

function loadDatabase() {
    return require('./data.json');
}


module.exports = {
    getBalance: function getBalance(username){
        return database[username];
    },
    
    transfer: function transfer(sender, reciever, amount){
        if (!(database.hasOwnProperty(sender))) {
            return "Account does not exsist";
        }   
        if (!(database.hasOwnProperty(reciever))) {
            return "Reciever does not exsits";
        }
        if(database[sender].balance < amount) {
            return "Out of funds"
        }
    
        database[sender].balance -= amount;    
        database[reciever].balance += amount;
        // not async
        fs.writeFileSync('data.json', JSON.stringify(database));
        return 0;
    }
  };