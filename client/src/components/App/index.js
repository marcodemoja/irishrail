import React, { Component } from 'react'
import './App.css'
import { List } from 'semantic-ui-react'

class App extends Component {

  state = {
    trains: [],
    trains_by_station: []
  }

  componentDidMount() {
    fetch('/trains/running')
      .then(res => res.json())
      .then(trains => this.setState({
        trains
      }))

    fetch('/station/bray/get-running-trains')
      .then(res => res.json())
      .then(trains_by_station => this.setState({
        trains_by_station
      }))
  }

  escapeSpecialChars(text) {
    return text.replace(/\\n/g, " - ")
  }

  renderList() {
    return this.state.trains.map(train => <List.Item key={train.TrainCode}>{this.escapeSpecialChars(train.PublicMessage)}</List.Item>
    )
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>blablabla</h1>
        </header>
        <List>
          {this.renderList()}
        </List>
      </div>
    )
  }
}

export default App
