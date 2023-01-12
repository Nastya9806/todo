import React, {Component} from 'react';


export default class Task extends Component{
constructor(props){
  super(props);
  this.state = {
    done: props.isDone,
    editing: props.isEditing
  };

  this.toggleDone = () => {
    this.setState((state) => {
      return {
        done: !state.done
      };
    });
  };

  this.onButtonClick = () => {
    console.log('есть контакт');
  };
}



render(){
  const {onDeleted} = this.props;
  const inputField = this.props.className === "editing" ? <input type="text" className="edit" value="Editing task" /> : null;
  let classNameCard = '';
  if(this.state.done){
    classNameCard += 'completed';
  }
  if(this.state.editing){
    classNameCard += 'editing';
  }
  return (
      <li className={classNameCard} key = {this.props.id}>
          <div className="view">
            <input className="toggle" type="checkbox" onClick = {this.toggleDone} />
            <label>
              <span className="description">{this.props.description}</span>
              <span className="created">{this.props.created}</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy" onClick = {() => onDeleted(this.props.id)}>
            
            </button>
          </div>
          {inputField}
        </li>
  )
}


}
