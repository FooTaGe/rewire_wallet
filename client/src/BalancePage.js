import React from 'react';
import SendForm from './SendForm.jsx';
const axios = require("axios");

class BalancePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: "jo",
        };
        this.getBalance();
      }
    
    renderSendForm(username) {
        return (
            <SendForm username={username} onTransfer={(resp) => this.handleTransfer(resp)} />
        )
    }
    
    handleTransfer(response) {
      var message = response;
      if (response === "OK") {
        this.getBalance();
        message = 'Money sent succesfully';
      }
      alert(message);
    }

    async getBalance() {
        const response = await axios.get("http://127.0.0.1:3001/balance/jo");
        const balance = response.data;
        this.setState({
            username: this.state.username,
            balance: balance.balance,
        });
    }
    
    render() {
      return (
        <div>
            <h2>{this.state.username}</h2>
            <h4>Balance: {this.state.balance}</h4>
            <p>&nbsp;</p>
            {this.renderSendForm(this.state.username)}
        </div>
      );
    }
  }
  
  export default BalancePage;
  