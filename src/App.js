import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';

class ToDoList extends Component {

  // constructor(props) {
  //   super(props);
  // }

  render() {

    let listItems = this.props.items.map((item,i)=>{
      
      let done = item.done ? 'done' : '';
      let doneText = ! item.done ? 'Listo' : 'No Listo'; 
      return (
        <li className={done} key={item.id}>
          <span>{item.value}</span>
          <button onClick={()=>this.props.onFinish(item.id)}>{doneText}</button>
          <button onClick={()=>this.props.onDelete(item.id)}>Eliminar</button>
        </li>
      )
    });
    
    return (
      <div>
        <div>
          Todo
        </div>
        <ul>
          {listItems}
        </ul>

        
      </div>
    
    )
  }

}

ToDoList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string,
    done: PropTypes.boolean
  })),
  onFinish: PropTypes.func,
  onDelete: PropTypes.func,
};


class ToDoNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }
  
  render() {
    return(
      
        <div className="ToDo-New">
          
          <input type="text" value={this.state.value} onChange={(e)=>this.handleChange(e)} />
          <button onClick={()=>this.addToDo()}>Añadir</button>
          <p>
            {this.state.value}
          </p>
        </div>
      
    )
  }

  addToDo() {
    let newValue = this.state.value;
    let newItem = {
      value: newValue,
      id: 1+Math.random(),
      done: false
    }
    this.props.onAdd( newItem );
    this.setState({
      value: ''
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

}

ToDoNew.propTypes = {
  onAdd: PropTypes.func
};

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      items: []
    }

  }

  render() {
    return (
      <div className="App">
        
        <ToDoNew onAdd={(i)=>this.onAddHandler(i)}/>

        <ToDoList
        items={this.state.items}
        onFinish={(i)=>this.onFinishHandler(i)}
        onDelete={(i)=>this.onDeleteHandler(i)}
        />

      </div>
    );
  }

  onAddHandler( newItem ) {
    
    let itemList = [...this.state.items];
    
    itemList.push( newItem )

    this.setState({
      items: itemList
    })
    
    
  }

  onFinishHandler( id ) {
    
    console.log("onFinishHandler",id);
    
    let itemList = [...this.state.items];
    
    itemList.map(item => {if( item.id === id ) item.done = !item.done });
    
    this.setState({
      items: itemList
    })

  }

  onDeleteHandler( id ) {
    
    
    let itemList = [...this.state.items];
    
    itemList = itemList.filter(item => item.id !== id );
    
    console.log(itemList,id);

    this.setState({
      items: itemList
    })
    
  }
}

export default App;
