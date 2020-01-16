import React from 'react';
const axios = require("axios");


class SendForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toName: '',
      sendAmount: '',
      username: this.props.username,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      Reciever : this.state.toName,
      Amount: this.state.sendAmount,
      Sender: this.state.username
    };
    const header = { headers: { 'Content-Type': 'application/json' } };
    
    axios.post("http://127.0.0.1:3001/send", data, header).then((resp) => {this.props.onTransfer(resp.data);});
    
  }

  handleAmountInputChange(event) {
    const value = event.target.value;
    const match = value.match(/^\d+\.?\d{0,2}$/gm);
    const newValue = match == null ? this.state.sendAmount : match;
    this.setState({
      toName: this.state.toName,
      sendAmount: newValue,
    });
  }

  handleRecieverInputChange(event) {
    const value = event.target.value;
    this.setState({
      toName: value,
      sendAmount: this.state.sendAmount,
    });
  }


  render() {
      return (
        <div>
            <div>I am: {this.props.username}</div>
            <form onSubmit={(event) => {this.handleSubmit(event);}}>
              <label>
                Send To:
              <input type="text" value={this.state.toName} onChange={(event) => this.handleRecieverInputChange(event)} placeholder="JohnSmith" name="toName" />
              </label>
              <label>
                Amount:
              <input type="number" value={this.state.sendAmount} onChange={(event) => this.handleAmountInputChange(event)} min="0.01" step="0.01"  placeholder="eg 25.4" name="sendAmount" />
              </label>
              <input type="submit" value="Send" />
            </form>
        </div>
      );
    }
  }
  
  export default SendForm;
  