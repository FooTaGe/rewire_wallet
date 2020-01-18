import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

const axios = require("axios");

class SendForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      toName: '',
      sendAmount: '',
      filteredUserList: [],
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      Reciever : this.state.toName,
      Amount: this.state.sendAmount,
      Sender: this.props.username
    };
    const header = { headers: { 'Content-Type': 'application/json' } };
    
    axios.post("http://127.0.0.1:3001/send", data, header)
      .then((resp) => {this.props.onTransfer(resp.data);})
      .catch((err) => {this.props.onTransfer(err.response.data);});
    
  }

  handleAmountInputChange(event) {
    const value = event.target.value;
   
    const match = value.match(/^\d*\.?\d{0,2}$/gm);
    const newValue = match == null ? this.state.sendAmount : match;
    this.setState({
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

  //TODO rename to safe/new function in react lifecycle
  componentWillReceiveProps(newProps) {
    let filteredUserList = [];
    for (let user of newProps.userList) {
      if (user.name !== this.state.username) {
        filteredUserList.push(user);
      }
    }

    this.setState({filteredUserList: filteredUserList});
  }


  render() {
      return (
        <div>
            <div>I am: {this.props.username}</div>
            <form onSubmit={(event) => {this.handleSubmit(event);}}>
              <label>
                Send To:
              </label>  
                <Autocomplete
                  id="combo-box-demo"
                  options={this.state.filteredUserList}
                  // value={this.state.toName}
                  onChange={(event, value) => {
                    console.log(value);
                    if (value) {
                      this.setState({toName: value.name});
                    }
                  }}
                  getOptionLabel={(option) => {
                    if (option.name !== this.props.username) {
                      return option.name
                    }
                  }}
                  style={{ width: 300 }}
                  renderInput={params => (
                    <TextField {...params} label="Receiver Name" variant="outlined" fullWidth />
                  )}
                />
                <div></div>
              {/* <input type="text" value={this.state.toName} onChange={(event) => this.handleRecieverInputChange(event)} placeholder="JohnSmith" name="toName" /> */}
              
              
              <TextField id="Amount" label="Type Amount" variant="outlined" value={this.state.sendAmount} onChange={(event) => this.handleAmountInputChange(event)} />
              {/* <input type="text" value={this.state.sendAmount} onChange={(event) => this.handleAmountInputChange(event)} placeholder="eg 25.4" name="sendAmount" /> */}
              <Button variant="contained" type="submit" >Send</Button>
              {/* <input type="submit" value="Send" /> */}
            </form>
        </div>
      );
    }
  }
  
  export default SendForm;
  