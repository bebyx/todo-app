import React from 'react';
import './App.css';
import { Remarkable } from 'remarkable';
const md = new Remarkable;

function App() {
  return (
    <div className="App">
      <header className="App-header">
       <h1><Clock /></h1>
      </header>
      <h2>Start doing NOW!</h2>
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

    if (!this.state.title.length || !this.state.body.length) {
      alert("All fields should be filled in!")
      return;
    }

    const newItem = {
      title: this.state.title,
      body: this.state.body,
      id: Date.now(),
      date: new Date()
    }
    this.setState(state => ({
      title: '',
      body: '',
      items: state.items.concat(newItem)
    }));
  }

  getMarkedText() {
    if (!this.state.body.length) {
      return { __html: "This is how your text will look like. **<b>Markdown</b>** is enabled."}
    }
    return { __html: md.render(this.state.body)};
  }

  render() {
   return (
    <div>
      <List items={this.state.items}/>
      <h1>Add Task:</h1>
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
      <h1>Output Preview:</h1>
      <p dangerouslySetInnerHTML={this.getMarkedText()}></p>
    </div>
    );
  }

}

function List(props) {
  return (
    <div class='task-list-container'>
      {props.items.map((item) => 
          <div key={item.id} class='one-task-container'>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <p><FormattedDate date={item.date}/></p>
          </div>
      )}
    </div>
  );
};


export default App;