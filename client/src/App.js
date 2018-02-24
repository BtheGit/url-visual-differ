import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    apiResults: ''
  }

  makeApiCall = () => {
    fetch('/api')
      .then(res => res.json())
      .then(res => {
        this.setState({apiResults: res.message})
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App__header">
          <h1 className="App__title">Evaluate pages</h1>
        </header>
        <button onClick={this.makeApiCall}>Click me for test API call</button>
        <div>{this.state.apiResults}</div>
      </div>
    );
  }
}

export default App;
