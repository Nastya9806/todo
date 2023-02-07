import React, { Component } from 'react'

export default class Task extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          onChange={() => this.props.onToggleDone(this.props.id)}
          checked={this.props.isDone}
        />
        <label>
          <span className="description">{this.props.description}</span>
          <span className="created">{this.props.created}</span>
        </label>
        <button className="icon icon-edit" onClick={() => this.props.onSetEditing(this.props.id)}></button>
        <button className="icon icon-destroy" onClick={() => this.props.onDeleted(this.props.id)}></button>
      </div>
    )
  }
}
