import React from 'react';
import ReactDOM from 'react-dom';
var fake = [
  {val:'Reestablish USSR',done:false},
  {val:"Award Olivier Giroud with the Ballon d'Or",done:false},
  {val:"Elect Jupiter as President of France", done:true}
]
class TodoList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      todos:[]
    }
  }
  componentDidMount(){
    this.setState({todos:fake})
  }
  render(){
    return (
      <div className="whole">
        <InputLine /><button>Add to Todo</button>
        <ul>
          {this.state.todos.map((woo)=><Todo key={woo.val} task={woo.val} done={woo.done}/>)}
        </ul>
      </div>
    )
  }
}
class InputLine extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (<input type='text'></input>)
  }
}
class Todo extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    var omega = this.props.done;
    if(omega){
      return (<li>
        <button>X</button>
        <strike>
        {this.props.task}
        </strike>
      </li>)
    }else{
      return(<li>
        <button>X</button>
        {this.props.task}
      </li>)
    }
  }
}
ReactDOM.render(<TodoList />,
   document.getElementById('root'));
