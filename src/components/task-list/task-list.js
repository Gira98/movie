/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from 'prop-types'

import Task from '../task/task'
import './task-list.css'

export default function TaskList({ todos, onToggleDone, onDelete, onEdit }) {
  const items = todos.map((todo) => (
    <Task {...todo} key={todo.id} onToggleDone={onToggleDone} onDelete={onDelete} onEdit={onEdit} />
  ))
  return <ul className="todo-list">{items}</ul>
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      done: PropTypes.bool.isRequired,
      created: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,

  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}
