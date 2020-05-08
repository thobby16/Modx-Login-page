import React, { Component } from 'react';
import {observer} from 'mobx-react'
import UserStore from './Store/UserStore';
import LoginFom from './LoginForm';

import SubmitButton from './SubmitButton';
import './App.css';

class App extends Component{

  async componentDidMount(){
    try {
      let res = await fetch('/isloggedIn', {
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      });

      let result = await res.json();
      if(result && result.success){
        UserStore.loading =false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else{
        UserStore.loading =false;
        UserStore.isLoggedIn = false;
      }
      
    } catch (e) {
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
    }
  }
  async doLogOut(){
    try {
      let res = await fetch('/logout', {
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      });

      let result = await res.json();
      if(result && result.success){

        UserStore.isLoggedIn = false;
        UserStore.username ='';
      }

      
    } catch (e) {
        console.log(e);
    }
  }
  render(){
    if(UserStore.loading){
      return(
        <div className="app">
          <div className ='container'>
            loading, please wait...
          </div>
          
      </div>
      );

    }
    else{
      if(UserStore.isLoggedIn){
        return(
          <div className="container">
          Welcome {UserStore.username}
          <SubmitButton
            text={'log out'}
            disabled={false}
            onClick ={ ()=> this.doLogOut()}
          />
      </div>
        )
      }
    }
    return( 
      <div className="app">
        <div className ='container'>
          
          <LoginFom/>
        </div>
      </div>
    );
  }
}

export default observer(App);
