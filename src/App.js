import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1><Clock /></h1>
       <h2></h2>
      </header>
      <h2>Start doing NOW!</h2>
      <div id="tasks-container">
      </div>
      <TodoList />
    </div>
  );
}



class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
        <FormattedDate date={this.state.date} />
    );
  }
}

function FormattedDate(props) {
  return <span>{props.date.toLocaleTimeString()}</span>;
}



class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    setTaskText(this.state.value);
    event.preventDefault();
  }

  render() {
   return (
      <form id="form" onSubmit={this.handleSubmit}>
        <li>
          <ul>
            <textarea type="text" value={this.state.value} onChange={this.handleChange} />
          </ul>
          <ul><input type="submit" value="Submit" /></ul>
        </li>
      </form>
    );
  }

}

function setTaskText(props) {
  let child = document.createElement('p');
  let textnode = document.createTextNode(props);
  child.appendChild(textnode);
  document.getElementById('tasks-container').appendChild(child);
}

export default App;


