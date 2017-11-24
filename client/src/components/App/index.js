import React, { Component } from 'react'
import './App.css'
import { List } from 'semantic-ui-react'

class App extends Component {

  state = {
    trains: [],
    trains_by_station: []
  }

  componentDidMount() {
    fetch('solutions/ARKLW/SKILL')
      .then(res => res.json())
      .then(trains => this.setState({
        trains
      }))

  }

  renderList() {
    return this.state.trains.length > 0 ? this.state.trains.map(train => <List.Item key={train.Traincode}>TrainCode: {train.Traincode} - depart: {train.Schdepart}</List.Item>
    )
      : <List.Item key={1}>There are no trains</List.Item>
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
