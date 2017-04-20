import React, { Component } from 'react'
//import logo from './logo.svg';
import './App.css'
import firebase from 'firebase'

var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
}
firebase.initializeApp(config)

let usersRef = firebase.database().ref('users')

class List extends Component {

	render () {
		return(
			<div>
				<ul>
					{this.props.msg.map(t => <li key={t}>{t}><button>X</button></li>)}
				</ul>
			</div>
		)
	}
} 

class App extends Component {
  constructor() {
  	super()
  	this.state = {
  		comments: []
  	}
  }
  pushUser() {
  	usersRef.push(document.querySelector(`#comment`).value)
  	document.querySelector(`#comment`).value = ''
  	usersRef.on('value', val => {
  		console.log(Object.values(val.val()))
  		this.setState({
  			comments: Object.values(val.val())
  		})
  	})
  }
  render() {
    return (
      <div>
      	<input type="text" id="comment"/>
	<button onClick={this.pushUser.bind(this)}>Push</button>
	<List msg={this.state.comments} />
      </div>
    )
  }
}

export default App
