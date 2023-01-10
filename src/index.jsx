import React from 'react';
// import {render} from 'react-dom';
import { createRoot } from 'react-dom/client';
import './components/index.css';
// import AppHeader from './components/app-header';
import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';
const container = document.getElementById('root');
const root = createRoot(container);





const App = () => {
  const taskData = [
    {className: 'completed', description: 'Completed task', created: 'created 17 seconds ago'},
    {className: 'editing', description: 'Editing task', created: 'created 5 minutes ago'},
    {description: 'Active task', created: 'created 17 seconds ago'}
  ];
  return (
    <div>
    <section className = 'todoapp'>
  {/* <span>{(new Date().toString())}</span> */}
  <NewTaskForm />
  <section className = 'main'>
  <TaskList taskData = {taskData}/>
  <Footer />
  </section>
      </section>
</div>

  );
};

const el = <App />
console.log(el);

root.render(el);