/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css'

export default function Footer({ todoLeftCount, onClearCompleted, ...filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoLeftCount} items left</span>
      <TasksFilter {...filter} />
      <button type="button" className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  todoLeftCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}
