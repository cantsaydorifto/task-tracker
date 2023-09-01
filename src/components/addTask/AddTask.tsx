"use client";
import { useState } from "react";
import Modal from "../Modal/Modal";
import styles from "./addTask.module.css";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import type { Task_Task as Task } from "@prisma/client";

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
  const [loading, setLoading] = useState(false);
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
        <p key={loading ? "Loading..." : ""} className="loading">
          {loading ? "Loading..." : ""}
        </p>
        <button
          className="addTaskBtn"
          onClick={async (event) => {
            event.preventDefault();
            setLoading(true);
            try {
              const res = await axiosPrivate.post<{ createdPost: Task }>(
                "/api/task/create",
                task,
                {
                  headers: { Authorization: `Bearer: ${ctx.auth.user?.token}` },
                }
              );
              addTask(res.data.createdPost);
              toggleModal();
            } catch (err) {}
          }}
        >
          Add Task
        </button>
      </form>
    </Modal>
  );
}
