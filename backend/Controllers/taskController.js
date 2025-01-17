const taskModel = require("../Models/taskModel");



const createTask = async (req,res)=>{
    const data = req.body;
    console.log("data " ,req.body)

    try{
        const model = new taskModel(data);
        await model.save();
        res.status(201).json({message: "task is created", success:true});

    }catch(err){
        res.status(500).json({message: "failed to create task", success: false});

    }
}

const fetchAllTask = async (req,res)=>{
    try{
        const data = await taskModel.find({});
        res.status(200).json({message: "All the Task", success:true, data});

    }catch(err){
        res.status(500).json({message: "failed to get all task", success: false});

    }
}

const updateTaskById = async (req,res)=>{
    try{
        const id = req.params.id;
        const body = req.body;
        const obj = {$set:{...body}};
        console.log("updated", obj)
        await taskModel.findByIdAndUpdate(id,obj);
        res.status(200).json({message: "Task Updated Successfully", success:true});

    }catch(err){
        res.status(500).json({message: "failed to update task", success: false});

    }
}

const DeleteTaskById = async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await taskModel.findByIdAndDelete(id);
        res.status(200).json({message: "Task is Deleted", success:true, data});

    }catch(err){
        res.status(500).json({message: "failed to delete task", success: false});

    }
}

module.exports = {
    createTask,
    fetchAllTask,
    updateTaskById,
    DeleteTaskById
};