const database1 = require('./database');
const express = require('express');
const app = express();
const port = 3001;

database = {
    jo: {balance: 100}
}

app.use(express.json());


app.get('/balance/:name', (req, res)=> {
    // Authentication?
    var userName = req.params.name;
    var balance = database1.getBalance(userName);
    res.send(balance);})


app.post('/send', (req, res)=> {
    // Authentication
    var sendRequest = req.body;
    var sender = sendRequest.Sender;
    var reciever = sendRequest.Reciever;
    var amount = sendRequest.Amount;
    // test correct request
    var returnCode = database1.transfer(sender, reciever, amount);
    if (returnCode != 0) {
        res.status(400).send(returnCode);
    }
    
    res.sendStatus(200);
    })



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

