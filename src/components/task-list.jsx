import React, {Component} from 'react';
import Task from './task';


const TaskList = ({taskData, onDeleted}) => {
    const elements = taskData.map((item) => {

        return (<Task {...item}
          onDeleted = {onDeleted}/>
          );
          
          
                    
    });

    return (
  <ul className = 'todo-list'>
      {elements}
      </ul>
    );
  };

  export default TaskList;

  console.log('zhopa');