
import PropTypes from 'prop-types'

import './tasks-filter.css'

export default function TasksFilter({ activeFilter, onFiltered }) {
  const clickHandler = (activeState) => {
    onFiltered(activeState)
  }
  return (
    <ul className="filters">
      <li>
        <button type='button' className={activeFilter === 'all' ? 'selected' : ''} onClick={() => clickHandler("all")}>
          All
        </button>
      </li>
      <li>
        <button  type='button' className={activeFilter === 'active' ? 'selected' : ''} onClick={() => clickHandler("active")}>
          Active
        </button>
      </li>
      <li>
        <button type='button' className={activeFilter === 'completed' ? 'selected' : ''} onClick={() => clickHandler("completed")}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  onFiltered: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired
}