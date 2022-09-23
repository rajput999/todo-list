import React,{useEffect, useState} from 'react'
import './todo.css'
import ShowTodo from './showTodo'

const getLocalItem=()=>{
  let list =(localStorage.getItem("data"))
  if(list){
    return JSON.parse(list);
  }
  else{
    return [];
  }
}

function Todo() {

  const[task,setTask]=useState("add some task")
  const[data,setData]=useState(getLocalItem())
  // const dataStorage = JSON.parse(localStorage.getItem("data"))

  const onChangeHandler = (e)=>{
    setTask(e.target.value)
  }
  const submitHandler =(e)=> {
    e.preventDefault();
    const newData =task;
    setData([...data,newData])
    setTask('')
  }
  const deleteItem=(a)=>{
    const finalData = data.filter((curEle,index)=>{
      return index != a;
    })
    setData(finalData)
  }

  useEffect(()=>{
    localStorage.setItem("data",JSON.stringify(data));
  },[data])

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center align-items-center main-row">
          <div className="col shadow main-col bg-white">
            <div className="row bg-primary text-white">
              <div className="col p-2">
                <h4 className="text-center">Todo App</h4>
              </div>
            </div>
            <form onSubmit={submitHandler}>
              <div className="row justify-content-between text-white p-2">
                <div className="from-group flex-fill mb-2 col-9">
                  <input id="todo-input" type="text" className="form-control" value={task} onChange={onChangeHandler} />
                </div>
                <button type="submit" className="btn btn-primary mb-2 ml-2 col-3">Add todo</button>
              </div>
            </form>
            {
              data.map((value,index)=>{
                return <ShowTodo
                key={index}
                id={index}
                task={value}
                onSelect={deleteItem}
                 />
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Todo
