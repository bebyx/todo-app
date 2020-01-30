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
      <Todo />
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



class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      items: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleRemoveItem = this.handleRemoveItem.bind(this);
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
      body: this.getMarkedText(),
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

  handleRemoveItem(event) {
    const updatedItems = this.state.items.filter(item => item.id !== event);
    this.setState({items: updatedItems})
  }

  render() {
   return (
    <div>
      <div class='task-list-container'>
        {this.state.items.map((item, index) => {
          return (
            <List 
              key={item.id}
              item={item} 
              onRemoveItem={this.handleRemoveItem}
            />
          );
        })}
      </div>
      <h1>Output Preview:</h1>
      <p dangerouslySetInnerHTML={this.getMarkedText()}></p>
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
    </div>
    );
  }

}

class List extends React.Component {
  constructor(props) {
    super(props);

    this.onRemoveItem = this.onRemoveItem.bind(this);
  }
    
    onRemoveItem(event) {
    event.preventDefault();
    this.props.onRemoveItem(this.props.item.id)
  }

  render() {
    return (
            <div key={this.props.item.id} class='one-task-container'>
              <h2>{this.props.item.title}</h2>
              <p dangerouslySetInnerHTML={this.props.item.body}></p>
              <p><button onClick={this.onRemoveItem}>Remove</button></p>
              <p><FormattedDate date={this.props.item.date}/></p>
            </div>
    )
  }
}

export default App;