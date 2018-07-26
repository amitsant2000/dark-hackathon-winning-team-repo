import React from 'react';
import Todo from './todo';
import InputLine from './InputLine'
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
  addTodo(a){
    fake.push({val:a,done:false})
    this.setState({todos:fake})
  }
  componentDidMount(){
    this.setState({todos:fake})
  }
  render(){
    return (
      <div className="whole">
        <InputLine submit={(a)=>this.addTodo(a)}/>
        <ul>
          {this.state.todos.map((woo)=><Todo key={woo.val} task={woo.val} done={woo.done}/>)}
        </ul>
      </div>
    )
  }
}
export default TodoList;
