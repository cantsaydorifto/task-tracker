"use client";
import { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./addTask.module.css";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import type { Task } from "@prisma/client";
import axios from "axios";

export default function AddTaskModal({
  toggleModal,
  addTask,
}: {
  toggleModal: () => void;
  addTask: (task: Task) => void;
}) {
  const [task, setTask] = useState<{ title: string; content: string }>({
    title: "",
    content: "",
  });
  const axiosPrivate = useAxiosPrivate();
  const ctx = useAuth();
  return (
    <Modal id={100} toggleModal={toggleModal}>
      <h1 style={{ fontSize: "1.6rem", color: "rgb(192, 192, 192)" }}>
        Create Task
      </h1>
      <form className={styles.addTaskForm}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            onChange={(event) =>
              setTask((prev) => {
                return { ...prev, title: event.target.value };
              })
            }
          />
        </div>
        <div>
          <label htmlFor="content">Enter Your Task Here</label>
          <textarea
            id="content"
            value={task.content}
            maxLength={240}
            onChange={(event) =>
              setTask((prev) => {
                return { ...prev, content: event.target.value };
              })
            }
            placeholder="Describe your Task"
          />
        </div>
        <button
          className="addTaskBtn"
          onClick={async (event) => {
            event.preventDefault();
            toggleModal();
            const res = await axiosPrivate.post<{ createdPost: Task }>(
              "/api/task/create",
              task,
              {
                headers: { Authorization: `Bearer: ${ctx.auth.user?.token}` },
              }
            );
            addTask(res.data.createdPost);
          }}
        >
          Add Task
        </button>
      </form>
    </Modal>
  );
}
