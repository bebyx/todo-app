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
      <p><input type="body" id="taskInput"></input></p>
      <button id="addTask" onClick={postTask}>Add Task</button>
      <div id="tasks-container">
      </div>
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


function getTaskText() {
  let task = document.getElementById('taskInput').value;
  if (task != "") { return task;}
}

function setTaskText(props) {
  let child = document.createElement('p');
  let textnode = document.createTextNode(props);
  child.appendChild(textnode);
  document.getElementById('tasks-container').appendChild(child);
}

function postTask() {
  return setTaskText(getTaskText());
}


export default App;


