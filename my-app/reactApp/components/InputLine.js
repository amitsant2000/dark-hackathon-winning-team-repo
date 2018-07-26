import React from 'react';
class InputLine extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
        <input type='text'>

        </input>
        <button onClick={()=>this.props.submit("Test Task")}>Add to Todo</button>
      </div>
    )
  }
}
export default InputLine;
