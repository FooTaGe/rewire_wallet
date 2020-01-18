import React from 'react';
import SendForm from './SendForm.jsx';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const axios = require("axios");

class BalancePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: "jo",
          userList: [],
          balance: '',
        };
        this.getBalance();
      }
    
    componentDidMount(){
      this.getUserList();
      console.log("state", this.state.userList);
    }
    
    renderSendForm(username, userList) {
        return (
            <SendForm username={username} userList={userList} onTransfer={(resp) => this.handleTransfer(resp)} />
        )
    }
    
    async getUserList() {
      const userList = await axios.get('http://127.0.0.1:3001/namelist');
      this.setState({userList: userList.data});
    }

    handleTransfer(response) {
      var message = response;
      if (response === "OK") {
        this.getBalance();
        message = 'Money sent succesfully';
      }
      alert(message);
    }

    async getUserBalance(username) {
      const url = "http://127.0.0.1:3001/balance/" + username;
      const response = await axios.get(url);
      const newBalance = response.data;
      this.setState({balance: newBalance.balance,});
    }
    
    getBalance() {
      this.getUserBalance(this.state.username);
    }
    
    render() {
      return (
        <div>
            <Autocomplete
            id="Choose Account"
            options={this.state.userList}
            // value={this.state.toName}
            onChange={(event, value) => {
              if (value) {
              this.setState({username: value.name});
              this.getUserBalance(value.name);
              }
            }}
            getOptionLabel={option => option.name}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Account Name" variant="outlined" fullWidth />
            )}
              />
            <h2>{this.state.username}</h2>
            <h4>Balance: {this.state.balance}</h4>
            <p>&nbsp;</p>
            {this.renderSendForm(this.state.username, this.state.userList)}
        </div>
      );
    }
  }
  
  export default BalancePage;
  