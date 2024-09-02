import './index.css'

const TagsTabItem = ({obj, handleFilterTasks}) => {
  const {displayText, optionId} = obj
  return (
    <li className="tags-li-container">
      <button
        className="tags-btn"
        type="button"
        onClick={() => handleFilterTasks(optionId)}
      >
        {displayText}
      </button>
    </li>
  )
}
export default TagsTabItem
