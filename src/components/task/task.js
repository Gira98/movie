/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import { Component } from 'react'
import PropTypes from 'prop-types'
import './task.css'

import { formatDistanceToNowStrict } from 'date-fns'

export default class Task extends Component {
  constructor(props) {
    super(props)
    const { label } = this.props
    this.state = {
      isEditing: false,
      inputText: label,
    }
  }

  onEditHandle = () => {
    const { isEditing } = this.state
    this.setState({
      isEditing: !isEditing,
    })
  }

  onInputChange = (e) => {
    this.setState({
      inputText: e.target.value,
    })
  }

  onEnterPress = (e) => {
    const { onEdit, id } = this.props

    if (e.key === 'Enter' && e.target.value !== '' && e.target.value !== ' ') {
      onEdit(id, e.target.value)

      this.setState({
        isEditing: false,
      })
    }
  }

  render() {
    const { label, id, done, created, onToggleDone, onDelete } = this.props
    const { isEditing, inputText } = this.state
    const editForm = (
      <input
        type="text"
        className="edit"
        onChange={this.onInputChange}
        onKeyDown={this.onEnterPress}
        value={inputText}
      />
    )
    const liClassForm = () => {
      if (isEditing) return 'editing'
      if (done) return 'completed'
      return ''
    }

    return (
      <li className={liClassForm()}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={() => onToggleDone(id)} />
          <label>
            <span className="description" onClick={() => onToggleDone(id)}>
              {label}
            </span>
            <span className="created">
              created {formatDistanceToNowStrict(created, { includeSeconds: true, addSuffix: true })}
            </span>
          </label>
          {/* eslint-disable-next-line */}
          <button type='button' className="icon icon-edit" onClick={() => this.onEditHandle(id)} />
          {/* eslint-disable-next-line */}
          <button type='button' className="icon icon-destroy" onClick={() => onDelete(id)} />
        </div>
        {isEditing === true ? editForm : null}
      </li>
    )
  }
}


Task.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
}
