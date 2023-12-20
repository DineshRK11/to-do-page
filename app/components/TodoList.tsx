import { ITask } from '@/Types/tasks'
import React from 'react'
import Task from './Task'

interface TodoProps{
    tasks : ITask[]
}

const TodoList:React.FC<TodoProps> = ({ tasks}) => {
  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
   
        <th>Tasks</th>
        <th>Status</th>
        <th>Action</th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {tasks.map((task)=>(
     <Task key={task.id} task={task}/>
      ))}
      
    </tbody>
  </table>
</div>
  )
}

export default TodoList