import React from 'react';


const Task = ({className, description, created}) => {
  const inputField = className === "editing" ? <input type="text" className="edit" value="Editing task" /> : null;

    return (
        <li className={className}>
            <div className="view">
              <input className="toggle" type="checkbox" />
              <label>
                <span className="description">{description}</span>
                <span className="created">{created}</span>
              </label>
              <button className="icon icon-edit"></button>
              <button className="icon icon-destroy"></button>
            </div>
            {inputField}
          </li>
    )
};

export default Task;