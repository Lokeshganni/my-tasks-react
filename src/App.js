import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagsTabItem from './components/TagsTabItem'
import TaskItem from './components/TaskItem'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    tasksList: [],
    filteredTasksList: [],
    userTxt: '',
    tagOption: tagsList[0].optionId,
  }

  componentDidMount() {
    this.getFilteredTasksList()
  }

  getFilteredTasksList = () => {
    const {tasksList} = this.state
    this.setState({filteredTasksList: tasksList})
  }

  handleUserTxt = event => {
    this.setState({userTxt: event.target.value})
  }

  handleTagOption = event => {
    this.setState({tagOption: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {tagOption, userTxt} = this.state
    const tagNameObj = tagsList.find(each => each.optionId === tagOption)
    const newObj = {
      id: uuidv4(),
      taskName: userTxt,
      tagName: tagNameObj.displayText,
      tagId: tagNameObj.optionId,
    }
    this.setState(
      prevState => ({
        tasksList: [...prevState.tasksList, newObj],
        userTxt: '',
        tagOption: tagsList[0].optionId,
      }),
      this.getFilteredTasksList,
    )
  }

  handleFilterTasks = id => {
    const {tasksList} = this.state
    const filterList = tasksList.filter(each => each.tagId === id)
    this.setState({filteredTasksList: filterList})
  }

  render() {
    const {filteredTasksList, userTxt, tagOption} = this.state
    return (
      <div className="app-container">
        <div className="create-task-main-container">
          <h1 className="create-task-heading">Create a task!</h1>
          <form className="form-main-container" onSubmit={this.onSubmitForm}>
            <label className="form-label-ele" htmlFor="task">
              Task
            </label>
            <input
              placeholder="Enter the task here"
              className="form-input-ele"
              type="text"
              id="task"
              value={userTxt}
              onChange={this.handleUserTxt}
            />
            <label className="form-label-ele" htmlFor="tags">
              Tags
            </label>
            <select
              value={tagOption}
              className="form-input-ele"
              id="tags"
              onChange={this.handleTagOption}
            >
              {tagsList.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <div className="form-btn-container">
              <button className="add-task-btn" type="submit">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="tags-main-container">
          <h1 className="heading">Tags</h1>
          <ul className="tags-ul-container">
            {tagsList.map(each => (
              <TagsTabItem
                handleFilterTasks={this.handleFilterTasks}
                key={each.optionId}
                obj={each}
              />
            ))}
          </ul>
          <h1 className="heading">Tasks</h1>
          {filteredTasksList.length === 0 ? (
            <div className="no-tasks-container">
              <p>No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="tasks-ul-container">
              {filteredTasksList.map(each => (
                <TaskItem key={each.id} obj={each} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
