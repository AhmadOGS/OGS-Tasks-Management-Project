import React, { useEffect, useRef, useState } from 'react'
import '../styles/add-task-window.css'

export const TaskAddingPopUp = () => {

// THE STATE AND IMPORTANT VARIABLES
    const [tasksList, setTasksList] = useState([])

    // ADD A NEW TASK WINDOW'S VARIABLES
    const [id, setId] = useState(0)
    const [isDaily, setIsDaily] = useState(false)
    const title = useRef('')
    const type = useRef('')
    const desc = useRef('')

    // EDIT TASK WINDOW'S VARIABLES
    const title1 = useRef('')
    const type1 = useRef('')
    const desc1 = useRef('')
    const [targetId, setTargetId] = useState(0)

    // WINDOWS VISIBILITY STATES
    const [visibility, setVisibility] = useState(false)
    const [visible, setVisible] = useState('unvisible')
    const [visibility1, setVisibility1] = useState(false)
    const [visible1, setVisible1] = useState('unvisible')


//--------------------------------------------------------------------------
// USEEFFECT

    useEffect(()=>{
        setVisible(visibility? 'visible' : 'unvisible')
        setVisible1(visibility1? 'visible' : 'unvisible')
    }, [visibility, visibility1])

//--------------------------------------------------------------------------
// SUBMIT HANDELERS

    // SUBMIT ADDING A NEW TASK
    const submitHandeler =(e) => {
      e.preventDefault()
      if(title.current.value === '' || desc.current.value === '' || type.current.value === '') {
        alert('Please fill the required informations')
      } else {
        setId(id + 1)
        setTasksList([...tasksList, {
          id: id,
          title: title.current.value,
          desc: desc.current.value,
          type: type.current.value,
          completed: false,
          isDaily: isDaily
        }])
        title.current.value = ''
        desc.current.value = ''
        type.current.value = ''
        setIsDaily(false)
        setVisibility(false)
      }
    }
    
    // SUBMIT MODIFIES ON A TASK
    const submitModifiesHandler = (e) => {
      e.preventDefault()
      if(title1.current.value === '' || desc1.current.value === '' || type1.current.value === '') {
        alert('Please fill the required informations')
      } else {
        let editedTodos = tasksList
        editedTodos = editedTodos.map(task => {
          if(task.id === targetId) {
            task.title = title1.current.value
            task.type = type1.current.value
            task.desc = desc1.current.value
            task.isDaily = isDaily
          }
          return task
        })
        setTasksList(editedTodos)
        setVisibility1(false)
      }
    }
    
//--------------------------------------------------------------------------
// BUTTONS HANDELERS

    //EDIT BTN
    const editBtnHandler = (task) => {
      setTargetId(task.id)
      title1.current.value = task.title
      type1.current.value = task.type
      desc1.current.value = task.desc
      setIsDaily(task.isDaily)
      setVisibility1(true)
    }
    
    // CHECK BTN
    const checkBtnHandeler = (id) => {
      let newTodos = tasksList
      newTodos = newTodos.map(task => {
        if(task.id === id) {
          task.completed = !task.completed
        }
        return task
      })
      setTasksList(newTodos)
    }
    
    // REMOVE BTN
    const removeTaskHandler = (id) => {
      let newTodos = tasksList
      let daily = false
      newTodos.forEach(task => {
        if(task.id === id) {
          daily = task.isDaily? true : false
        }
      })
      if(daily) {
        alert('This Task is a Daily Task!\nif you want to remove it please make it not daily.')
        return
      } else {
        newTodos = newTodos.filter(item => item.id !== id)
        setTasksList(newTodos)
      }
    }

//--------------------------------------------------------------------------  
// FUNCTIONS FOR CLICKING THE TASK 

    const showText = (id) => {
      const task = document.getElementById(id)
      if(task.querySelector('.task-infos p').id === 'paragraph') {
        task.querySelector('.task-infos p').id = 'show-more'
      } else if (task.querySelector('.task-infos p').id === 'show-more') {
        task.querySelector('.task-infos p').id = 'paragraph'
      }
    }

    const streatching = (id) => {
      if(document.getElementById(id).className === 'task') {
        document.getElementById(id).className = 'task streatched'
      } else if (document.getElementById(id).className === 'task streatched') {
        document.getElementById(id).className = 'task'
      }
    }

    const openTheTask = (id) => {
      showText(id)
      streatching(id)
    }

//--------------------------------------------------------------------------
// RENDERING THE PAGE
  return (
    <div className='container'>

      <button className='add-btn' onClick={()=>setVisibility(true)}>+</button>

      <div id={visible} className='add-task-window'>
          <h1>Add a new Task</h1>
          <form onSubmit={submitHandeler}>
              <div className='informations-form'>
                <div>
                  <label htmlFor="title">Ttile: </label>
                  <input type="text" id='title' ref={title} placeholder='Write a Title' />
                </div>
                <div>
                  <label htmlFor="desc">Description: </label>
                  <input type="text" id='desc' ref={desc} placeholder='Write a Description' />
                </div>
                <div className='type-input'>
                  <label htmlFor="type">Type: </label>
                  <input type="text" id='type' ref={type} placeholder='Write a Type' />
                </div>
                  <div className='toggle-daily-btn' id={isDaily? 'daily' : 'not-daily'} onClick={() => setIsDaily(!isDaily)}>
                      Daily?
                  </div>
              </div>
              <button className='cancel-btn' type="button" onClick={()=>setVisibility(false)}>Cancel</button>
              <button className='save-btn' type='submit'>Save</button>
          </form>
      </div>

      <div id={visible1} className='edit-window'>
        <h1>Edit this Task</h1>
        <form onSubmit={submitModifiesHandler}>
          <div className='informations-form'>
          <div>
            <label htmlFor="title">Ttile: </label>
            <input type="text" id='title' ref={title1} placeholder='Write a Title' />
          </div>
          <div>
            <label htmlFor="desc">Description: </label>
            <input type="text" id='desc' ref={desc1} placeholder='Write a Description' />
          </div>
          <div className='type-input'>
            <label htmlFor="type">Type: </label>
            <input type="text" id='type' ref={type1} placeholder='Write a Type' />
          </div>
            <div className='toggle-daily-btn' id={isDaily? 'daily' : 'not-daily'} onClick={() => setIsDaily(!isDaily)}>
                Daily?
            </div>
          </div>
          <button className='cancel-btn' type="button" onClick={()=>setVisibility1(false)}>Cancel</button>
          <button className='save-btn' type='submit'>Save</button>
        </form>
      </div>

      <div className='tasks-container'>
        {tasksList.map((task) => {
        return (
          <div className='task-holder' key={task.id}>
            <div className='task' id={`task-${task.id}`}>
              <div className='side-btns'>
                <span className='remove-btn' onClick={() => removeTaskHandler(task.id)}>X</span>
                <span className='edit-btn' onClick={() => editBtnHandler(task)}>/</span>
              </div>
              <div className='task-infos'>
                <div  onClick={() => openTheTask(`task-${task.id}`) } >
                  <h3 style={task.completed? {textDecoration: 'line-through'} : {textDecoration: 'none'} }>
                    {task.title}
                  </h3>
                  <p id='paragraph' style={task.completed? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>
                    {task.desc}
                  </p>
                </div>
                <button id={task.completed? 'checked': null} className='check-btn' onClick={() => checkBtnHandeler(task.id)}></button>
              </div>
            </div>
            <div className='type-box'>{task.type}</div>
          </div>
          )}
        )})
      </div>
    
    
    </div> 
  )
}
