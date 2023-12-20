"use client";
import { ITask } from "@/Types/tasks";
import React, { ChangeEventHandler, FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [isCompleted, setIsCompleted] = useState<boolean>(task.completed);

  const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await editTodo({
      id: task.id,
      text: taskToEdit,
      completed: isCompleted,
    });

    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // console.log("e",e.currentTarget.checked);
    setIsCompleted(e.currentTarget.checked);
  };
  return (
    <tr key={task.id}>
      <td>{task.text}</td>
      <td>
        <div
          className={
            task.completed
              ? "rounded-full bg-[green] w-[20px] h-[20px]"
              : "rounded-full bg-[yellow] w-[20px] h-[20px]"
          }
        ></div>
      </td>
      <td className="flex gap-5">
        <FiEdit
          cursor="pointer"
          className="text-blue-500"
          size={23}
          onClick={() => setOpenModalEdit(true)}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEdit}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <div className="flex-col items-center">
                <input
                  type="text"
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  placeholder="Type here"
                  className="input input-bordered w-full "
                />
                <label>Completed </label>{" "}
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={handleChange}
                  className="checkbox [--chkbg:oklch(var(--a))] [--chkfg:oklch(var(--p))] relative top-2 left-2"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          cursor="pointer"
          className="text-red-500"
          size={23}
          onClick={() => setOpenModalDelete(true)}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalEdit}>
          <h3>Are you sure, you want to delete this task ?</h3>
          <div className="modal-action">
            <button
              className="btn bg-[black] text-white"
              onClick={() => handleDelete(task.id)}
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
