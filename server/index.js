const database1 = require('./database');
const express = require('express');
const app = express();
const port = 3001;
var cors = require('cors')

app.use(cors())

app.use(express.json());


app.get('/balance/:name', (req, res)=> {
    // Authentication?
    var userName = req.params.name;
    console.log(`balance request by ${userName}`);
    var balance = database1.getBalance(userName);
    res.send(balance);})

app.get('/namelist', (req, res)=> {
    res.send(database1.getNames());
})

app.post('/send', (req, res)=> {
    // Authentication
    var sendRequest = req.body;
    var sender = sendRequest.Sender;
    var reciever = sendRequest.Reciever;
    var amount = Number(sendRequest.Amount);
    // test correct request
    console.log(`Transfer request of ${amount} from ${sender} to ${reciever}`);
    var returnCode = database1.transfer(sender, reciever, amount);
    if (returnCode != 0) {
        res.status(400).send(returnCode);
    }
    else {
        res.sendStatus(200);
    }
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

