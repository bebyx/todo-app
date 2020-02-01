import React from 'react';
import './App.css';
import { Remarkable } from 'remarkable';

const md = new Remarkable();

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
  return <span>{props.date.toLocaleString()}</span>;
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
    this.handleDoneTask = this.handleDoneTask.bind(this);
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
      isChecked: false,
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

  handleDoneTask(iid, event) {
    const i = this.state.items.findIndex(item => item.id === iid);
    const checkingItems = this.state.items;

    checkingItems[i].isChecked = event;

    setTimeout(x => this.setState(x), 0, {items: checkingItems});

  }

  render() {
   return (
    <div>
      <div class='task-list-container'>
        {this.state.items.map((item, index) => {
          return (
            <List 
              item={item} 
              onRemoveItem={this.handleRemoveItem}
              onCheckChange={this.handleDoneTask}
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
    this.onCheckChange = this.onCheckChange.bind(this);
  }
    
    onRemoveItem(event) {
    event.preventDefault();
    this.props.onRemoveItem(this.props.item.id)
  }

    onCheckChange(event) {
    event.preventDefault();
    this.props.onCheckChange(this.props.item.id, event.target.checked)
  }

  render() {
    return (
            <div key={this.props.item.id} class='one-task-container'>
              <h2 className={ this.props.item.isChecked ? 'crossed-line' : '' }>{this.props.item.title}</h2>
              <p className={ this.props.item.isChecked ? 'crossed-line' : '' } dangerouslySetInnerHTML={this.props.item.body}></p>
              <p><label>Done:</label><input type="checkbox" checked={this.props.item.isChecked} onChange={this.onCheckChange}></input></p>
              <p><button onClick={this.onRemoveItem}>Remove</button></p>
              <p><FormattedDate date={this.props.item.date}/></p>
            </div>
    )
  }
}

export default App;