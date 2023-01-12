import React, {Component} from 'react';
import { createRoot } from 'react-dom/client';
import './components/index.css';
import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';
const container = document.getElementById('root');
const root = createRoot(container);

export default class App extends Component{
constructor(props){
  super(props);

  this.state = {
    taskData : [
      {isDone: true, isEditing: false, description: 'Completed task', created: 'created 17 seconds ago', id: 1},
      {isDone: false, isEditing: true, description: 'Editing task', created: 'created 5 minutes ago', id: 2},
      {isDone: false, isEditing: false, description: 'Active task', created: 'created 17 seconds ago', id: 3},
      {isDone: false, isEditing: false, description: 'Выпить кофе', created: 'created 17 seconds ago', id: 4}
    ]
  };

  this.deleteItem = (id) => {
    this.setState(({taskData}) => {

     const idx = taskData.findIndex((el) => el.id === id);
     
     const newArr = [
       ...taskData.slice(0, idx),
       ...taskData.slice(idx + 1)
     ];
    
   
     return {
       taskData: newArr
     };
 
    
    });
    };
}

render(){
  return (
    <div>
    <section className = 'todoapp'>
  <NewTaskForm />
  <section className = 'main'>
  <TaskList 
  taskData = {this.state.taskData}
  onDeleted = {this.deleteItem}/>
  <Footer />
  </section>
      </section>
</div>

  );
}
}

const el = <App />

root.render(el);