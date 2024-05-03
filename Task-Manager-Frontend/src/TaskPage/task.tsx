/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./task.scss";
import delete_image from "../images/delete.jpeg";
import { useMutation, useQuery } from "@apollo/client";
import {GET_TASKS} from "../graphql/queries.ts";
import { EDIT_TASK, DELETE_TASK,ADD_TASK, STATUS_CHANGE } from "../graphql/mutations.ts";
import {Bounce, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const titleRequired=()=>{

}

const dateRequired=()=>{

}


const TaskList: React.FC = () => {

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  const [inputValue, setInputValue] = useState<string>("");
  const [inputDate, setInputDate] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState<string>("");
  const [editingTaskDate, setEditingTaskDate] = useState<string>("");
  const [filterOption, setFilterOption] = useState<string>("all");

  //queries and mutations
  const { loading, error, data } = useQuery(GET_TASKS);
  const [addTaskMutation, { loading: mutationLoading, error: mutationError }] = useMutation(ADD_TASK);
  const [deleteTaskMutation, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_TASK);
  const [editTaskMutation, { loading: editLoading, error: editError }] = useMutation(EDIT_TASK);
  const [statusChangeMutation, { loading: statusLoading, error: statusError }] = useMutation(STATUS_CHANGE);

  
  try {
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
  } catch (error) {
    console.log("An error occured:",error);
  }
  
  const addTask = async () => {
    if (inputValue.trim() === "") {
      titleRequired();
      return;
    }
    if (inputDate === "") {
      dateRequired();
      return;
    }
    console.log(inputDate)

    try {
      const newTaskInput = {
        addData: {
          taskTitle: inputValue.trim().charAt(0).toUpperCase() + inputValue.trim().slice(1),
          sortDate: inputDate,
          taskDate: inputDate.slice(8,10)+"-"+inputDate.slice(5,7)+"-"+inputDate.slice(0,4),
        }
      };
  
      const { data } = await addTaskMutation({
        variables: newTaskInput,
        refetchQueries: [{ query: GET_TASKS }]
      });
        setInputValue("");
        setInputDate("");
        const addedTask=()=>{
       
            
        }
      addedTask();
      return data;
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id: string, taskTitle: string) => {
    const taskID = parseInt(id,10);
  try {
    const deletedTask=()=>{
  
    }

    deletedTask();
    await deleteTaskMutation({
      variables: { deleteData: taskID },
      refetchQueries: [{ query: GET_TASKS }]
    });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

  const statusChange=async (id:string, status :boolean)=>{
    console.log(status)
    const taskID=parseInt(id,10);
    try {
      await statusChangeMutation({
        variables:{
          statusChange: {
            id: taskID,
            taskStatus: status
          },
          refetchQueries: [{ query: GET_TASKS }]
        }
      });
      if(status){
        const task = data.getTasks.find(task => task.id === id);
        console.log(task);

   
      }
    } catch (error) {
      console.error("Error status change task:", error);
    }
  }

  const startEditingTask = (id: number, title: string, date: string) => {
    console.log(date)
    setEditingTaskId(id);
    setEditingTaskTitle(title);
    setEditingTaskDate(date.slice(6,10)+'-'+date.slice(3,5)+'-'+date.slice(0,2));
  };

  const cancelEditingTask = () => {
    setEditingTaskId(null);
    setEditingTaskTitle("");
    setEditingTaskDate("");
  };

  const saveEditedTask = async (id: string) => {
    if (editingTaskTitle.trim() === "") {
      titleRequired()
      return;
    }
    if (editingTaskDate.trim() === "") {
      dateRequired()
      return;
    }

    console.log(editingTaskDate)

    const taskId=parseInt(id,10);

    try {
      const updatedTaskInput = {
        editData: {
          id:taskId,
          taskTitle: editingTaskTitle,
          taskDate: editingTaskDate.slice(8,10)+"-"+editingTaskDate.slice(5,7)+"-"+editingTaskDate.slice(0,4),
          sortDate: editingTaskDate,
        }
      };

      await editTaskMutation({
        variables: updatedTaskInput,
        refetchQueries: [{ query: GET_TASKS }]
      });

      cancelEditingTask();
    } catch (error) {
      console.error("Error saving edited task:", error);
    }
  };


  const filteredTasks = filterOption === "all" ? data.getTasks : data.getTasks.filter((task) => task.taskStatus === (filterOption === "completed"));

  return (
    <div className="body">
      <div className="task-container">

        <div className="main-heading">
          <h1 className="app-heading">Task Manager</h1>
          <div className="edit-filter">
            <div className="filters">
              <div className="filter-heading"><b>Filter:</b></div>
              <select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value)}
                className="filter-option"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <button onClick={addTask} className="create-button">
              Create
            </button>
          </div>
        </div>

        <div className="inputs">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter Task Title"
            className="task-title"
            required
          />

          <div className="deadline-component">
            <div className="deadline-text"><b>Deadline Date:</b></div>
            <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                // min={getCurrentDate()}
                className="task-date"
                required
            />
          </div>

        </div>

        <div className={`filtered-tasks`}>
          {filteredTasks.map((task) => (
            <div key={task.id} className="task-details">
              {editingTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={editingTaskTitle}
                    onChange={(e) => setEditingTaskTitle(e.target.value)}
                    placeholder={inputValue.trim() === '' ? 'Provide a Task Title' : 'Enter Task Title'}
                    className="edit-task-title"
                    required
                  />

                  <input
                    type="date"
                    value={editingTaskDate}
                    // min={getCurrentDate()}
                    onChange={(e) => setEditingTaskDate(e.target.value)}
                    className="edit-task-date"
                    required
                  />
                  <div className="save-cancel-buttons">
                    <button onClick={() => saveEditedTask(task.id)} className="save-button">Save</button>
                    <button onClick={cancelEditingTask} className="cancel-button">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="task-detail-line">
                    <div className="display-task-title">{task.taskTitle}</div>
                    <img src={delete_image} alt="delete" onClick={() => deleteTask(task.id, task.taskTitle)} className="delete-img"/>
                  </div>
                  <div className="date-details">
                    <div className="date-deadline"><b>Deadline:</b></div>
                    <div className="display-task-date">{task.taskDate}</div>
                  </div>
                  <div className="remaining">
                  <select
                    value={task.taskStatus ? 'Completed' : 'Pending'}
                    onChange={(e)=> e.target.value==='Completed'?statusChange(task.id, true):statusChange(task.id, false) }
                    className="task-status"
                  >
                    <option value="Completed" >Completed</option>
                    <option value="Pending" >Pending</option>
                  </select>
                    <button onClick={() => startEditingTask(task.id, task.taskTitle, task.taskDate)} className="edit-button">Edit</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;