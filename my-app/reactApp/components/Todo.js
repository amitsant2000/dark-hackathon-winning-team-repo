import React from 'react';
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
export default Todo;
