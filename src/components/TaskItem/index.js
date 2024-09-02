import './index.css'

const TaskItem = ({obj}) => {
  const {taskName, tagName} = obj
  return (
    <li className="task-li-container">
      <p className="task-name-para">{taskName}</p>
      <p className="tag-name-para">{tagName}</p>
    </li>
  )
}
export default TaskItem
