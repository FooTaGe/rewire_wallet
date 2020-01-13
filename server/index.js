const express = require('express')
const app = express()
const port = 3001

database = {
    jo: {balance: 100}
}

app.use(express.json());


app.get('/balance/:name', (req, res)=> {
    // Authentication?
    var userName = req.params.name;
    var balance = database[userName];
    res.send(balance);})


app.post('/send', (req, res)=> {
    // Authentication
    var sendRequest = req.body;
    // test correct request
    var success = updateDatabase(sendRequest);
    if (success) {
        res.sendStatus(200)
    }
    else {
        res.sendStatus(403)
    }

    })



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function updateDatabase(request) {
    // Reciever Amount Sender
    var reciever = request.Reciever;
    var amount = request.Amount;
    var sender = request.Sender;

    if (database.hasOwnProperty(sender)) {
        database[sender].balance -= amount;
        if (!(database.hasOwnProperty(reciever))) {
            database[reciever] = {balance : 0};
        }
        database[reciever].balance += amount;
    }
    else {
        return false;
    }
    return true;

}
