"use client";
import React, { ChangeEventHandler, FormEvent, FormEventHandler, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
    const router =useRouter()
  const [modalOpen, setModalOpen] = useState(false);
  const [newTask,setNewTask]=useState('');
  const [isCompleted,setIsCompleted]=useState(false)

  const handleSubmit:FormEventHandler<HTMLFormElement> =async(e)=>{
    e.preventDefault();
    // console.log('here',newTask)
    
    await addTodo({
        id:uuidv4(),
        text:newTask,
        completed:isCompleted,
    })
    setNewTask('')
    setIsCompleted(false)
    setModalOpen(false);
    router.refresh();
  }

  const handleChange:ChangeEventHandler<HTMLInputElement> =(e)=>{
    setIsCompleted(e.currentTarget.checked)
  }
  return (
    <div>
      <button
        className="btn btn-primary w-full"
        onClick={() => setModalOpen(true)}
      >
        Add new Task
        <AiOutlinePlus className="ml-2" size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
          <div className="flex-col">
            <input
              type="text"
              value={newTask}
              onChange={(e)=>setNewTask(e.target.value)}
              placeholder="Type here"
              className="input input-bordered w-full"
            />
               <label  className="float-left mt-1 my-2 ml-2">Completed  <input type="checkbox" checked={isCompleted} onChange={handleChange} className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))] relative top-2 left-2 " /></label> 
              </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
