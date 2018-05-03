import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    mapComponent: null
  };
  handleClick = () => {
    console.log('handleClick');
    import('./components/Map')
      .then(mod => {
        // render map component
        this.setState({
          mapComponent: mod.default
        });
      })
      .catch(err => {
        // Handle failure
        console.error(err);
      });
  };  
  render() {
    const { mapComponent: Map } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        { Map !== null ? <Map /> : <p><button onClick={this.handleClick}>Load Map</button></p> }
      </div>
    );
  }
}

export default App;
