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
        <FormattedTime date={this.state.date} />
    );
  }
}

function FormattedTime(props) {
  return <span>{props.date.toLocaleTimeString()}</span>;
}

function FormattedDate(props) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };  
  return <span>{props.date.toLocaleDateString('en-US', options)}</span>;
}


class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      deadline_day: 1,
      deadline_month: 'January',
      deadline_year: 2020,
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
      alert("All fields should be filled in!");
      return;
    }

    const deadline_data = this.state.deadline_month + 
                          ' ' + this.state.deadline_day + 
                          ', ' + this.state.deadline_year;
    const deadline_date = new Date(deadline_data);

    if (Date.parse(deadline_date) < Date.now()) {
      alert("Deadline can't be earlier than of now");
      return;
    }

    const newItem = {
      title: this.state.title,
      body: this.getMarkedText(),
      isChecked: false,
      deadline: deadline_data,
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

  februaryCheck() {
    if (this.state.deadline_month === 'February') {
      return 'hide';
    }
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
          <ul>
            <select name="deadline_month" value={this.state.deadline_month} onChange={this.handleChange}>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
            <select name="deadline_day" value={this.state.deadline_day} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29" 
                className={ (this.state.deadline_month === 'February' &&
                             this.state.deadline_year % 4 !== 0
                             ) ? 'hide' : '' }>29
              </option>
              <option value="30" 
                className={ (this.state.deadline_month === 'February') ? 'hide' : '' }>
                30
              </option>
              <option value="31" 
                className={ (this.state.deadline_month === 'February' ||
                             this.state.deadline_month === 'April' ||
                             this.state.deadline_month === 'June' ||
                             this.state.deadline_month === 'September' ||
                             this.state.deadline_month === 'November'
                             ) ? 'hide' : '' }>
                31
              </option>
            </select>
            <input name= "deadline_year" type="number" maxlength="4" minlength="4" value={this.state.deadline_year} onChange={this.handleChange} />
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
              <p><b>Deadline:</b> {this.props.item.deadline}</p>
              <p><label>Done:</label><input type="checkbox" checked={this.props.item.isChecked} onChange={this.onCheckChange}></input></p>
              <p><button onClick={this.onRemoveItem}>Remove</button></p>
              <p><FormattedDate date={this.props.item.date}/></p>
            </div>
    )
  }
}

export default App;