import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { CreateTask, DeleteTaskById, GetAllTask, UpdateTaskById } from "./api";
import { notify } from "./utils";
export function TaskManager() {

    const [input, setInput] = useState("");
    const [task, setTask] = useState([]);
    const [copyTask, setCopyTask] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask= async ()=>{
        if(updateTask && input){
           // update api call
           console.log("update api call");
           const obj={
            taskName: input,
            isDone: updateTask.isDone,
            _id: updateTask._id
        }
           handleUpdate(obj);
           
        } else if(updateTask ===null && input){
           //create api call
           console.log("create api call");
           
           handleAddClick();
        }
        setInput("");

    }
    useEffect(()=>{
     if(updateTask){
        setInput(updateTask.taskName)
     }
    },[updateTask])
    const handleAddClick = async () => {
        const obj = {
            taskName: input,
            isDone: false
        }
        try {
            const { success, message } = await CreateTask(obj);
            if (success) {
                //show success toast
                notify(message, "success");
            } else {
                //show error toast
                notify(message, "error");
            }

        } catch (error) {
            console.log(error)
            notify("Failed to create task", "success");
        }
        setInput("");
        fetchAllTask();
    }



    const fetchAllTask = async () => {
        try {
            const { data } = await GetAllTask();
            setTask(data);
            setCopyTask(data);


        } catch (error) {
            console.log(error)
            notify("Failed to Get All task", "success");
        }

    }
    
    useEffect(() => {
        fetchAllTask();
    }, [])

    const handleDeleteTask = async (id)=>{
        try {
            const { success, message } = await DeleteTaskById(id);
            if (success) {
                //show success toast
                notify(message, "success");
            } else {
                //show error toast
                notify(message, "error");
            }    
            fetchAllTask(); 
      

        } catch (error) {
            console.log(error)
            notify("Failed to Delete task", "error");
        }
        
    }
    const handleCheckAndUncheck = async (item)=>{
        const {_id, isDone, taskName} = item;

        const obj={
            taskName,
            isDone:!isDone
        }

        try {
            const { success, message } = await UpdateTaskById(_id,obj);
            if (success) {
                //show success toast
                notify(message, "success");
            } else {
                //show error toast
                notify(message, "error");
            }    
            fetchAllTask(); 
      

        } catch (error) {
            console.log(error)
            notify("Failed to Delete task", "error");
        }
    }

    const handleUpdate =async (item)=>{
        const {_id, isDone, taskName} = item;

        const obj={
            taskName,
            isDone:!isDone
        }

        try {
            const { success, message } = await UpdateTaskById(_id,obj);
            if (success) {
                //show success toast
                notify(message, "success");
            } else {
                //show error toast
                notify(message, "error");
            }    
            fetchAllTask(); 
      

        } catch (error) {
            console.log(error)
            notify("Failed to Delete task", "error");
        }
    }
    const handleSearch = (e)=>{
      const term = e.target.value.toLowerCase();
      const oldTask = [...copyTask];
      const results = oldTask.filter((item)=>item.taskName.toLowerCase().includes(term));
      setTask(results);
      
    }
    return (
        <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
            <h1 className="mb-4">Task Manager</h1>

            {/* Input and Search Box */}
            <div className="d-flex justify-content-between align-items-center mb-4 w-100">
                <div className="input-group flex-grow-1 me-2">
                    <input type="text" className="form-control me-1" placeholder="Add a New Task" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button onClick={handleTask} className="btn btn-success btn-sm me-2"><span className="bi bi-plus"></span></button>
                </div>
                <div className="input-group flex-grow-1">
                    <span className="input-group-text bi bi-search"></span>
                    <input onChange={handleSearch} type="text" className="form-control" placeholder="Search Task" />
                </div>
            </div>

            {/* List of Items */}
            <div className="d-flex flex-column w-100">
                {
                    task.map(item =>
                        <div key={item._id} className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center">
                            <span className={item.isDone ? "text-decoration-line-through":""}>
                                {item.taskName}
                            </span>
                            <div>
                                <button onClick={()=>handleCheckAndUncheck(item)} type="button" className="btn btn-success btn-sm me-2"><span className="bi bi-check"></span></button>
                                <button onClick={()=>setUpdateTask(item)} type="button" className="btn btn-primary btn-sm me-2"><span className="bi bi-pen"></span></button>
                                <button onClick={()=>handleDeleteTask(item._id)} type="button" className="btn btn-danger btn-sm me-2"><span className="bi bi-trash"></span></button>
                            </div>
                        </div>
                    )
                }

            </div>

            {/* Toastify */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    )
}