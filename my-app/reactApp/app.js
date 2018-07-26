import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './components/TodoList';
var fake = [
  {val:'Reestablish USSR',done:false},
  {val:"Award Olivier Giroud with the Ballon d'Or",done:false},
  {val:"Elect Jupiter as President of France", done:true}
]



ReactDOM.render(<TodoList />,
   document.getElementById('root'));
