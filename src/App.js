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
      <TodoListForm />
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



class TodoListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      items: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      title: '',
      body: '',
      items: [...this.state.id, this.state.title, this.state.body]
    })
  };

  render() {
   return (
    <div>
      <List items={this.state.items}/>
      <form id="form" onSubmit={this.handleSubmit}>
        <li>
          <ul>
            <input name="title" type="text" value={this.state.title} onChange={this.handleChange} />
          </ul>
          <ul>
            <textarea name="body" type="text" value={this.state.body} onChange={this.handleChange} />
          </ul>
          <ul><button>Submit</button></ul>
        </li>
      </form>
    </div>
    );
  }

}

function setTaskText(props) {
  let childTitle = document.createElement('h3');
  let textnodeTitle = document.createTextNode(props.title);
  let childP = document.createElement('p');
  let textnodeP = document.createTextNode(props.body);
  childTitle.appendChild(textnodeTitle);
  childP.appendChild(textnodeP);
  document.getElementById('tasks-container').appendChild(childTitle);
  document.getElementById('tasks-container').appendChild(childP);
}

const List = props => (
  <ul>
    {
      props.items.map((item, index) => <li key={index}>{item}</li>)
    }
  </ul>
);


export default App;