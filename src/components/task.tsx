"use client";

import AddTaskModal from "@/components/addTask/AddTask";
import type { Task } from "@prisma/client";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import { motion } from "framer-motion";

function getRelativeTime(timeStamp: Date) {
  const now = new Date();
  const secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if (secondsPast < 60) {
    const secondsAgo = Math.floor(secondsPast);
    return secondsAgo > 1
      ? `${secondsAgo} seconds ago`
      : `${secondsAgo} second ago`;
  }
  if (secondsPast < 3600) {
    const minutesAgo = Math.floor(secondsPast / 60);
    return minutesAgo > 1
      ? `${minutesAgo} minutes ago`
      : `${minutesAgo} minute ago`;
  }
  if (secondsPast <= 86400) {
    const hoursAgo = Math.floor(secondsPast / 3600);
    return hoursAgo > 1 ? `${hoursAgo} hours ago` : `${hoursAgo} hour ago`;
  }
  if (secondsPast <= 2628000) {
    const daysAgo = Math.floor(secondsPast / 86400);
    return daysAgo > 1 ? `${daysAgo} days ago` : `${daysAgo} da ago`;
  }
  if (secondsPast <= 31536000) {
    const monthsAgo = Math.floor(secondsPast / 2628000);
    return monthsAgo > 1 ? `${monthsAgo} months ago` : `${monthsAgo} month ago`;
  }
  if (secondsPast > 31536000) {
    const yearsAgo = Math.floor(secondsPast / 31536000);
    return yearsAgo > 1 ? `${yearsAgo} years ago` : `${yearsAgo} year ago`;
  }
}

export default function Tasks({ token }: { token: string }) {
  const axiosPrivate = useAxiosPrivate();
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function getTasks() {
      try {
        const res = await axiosPrivate.get("/api/task", {
          headers: { Authorization: `Bearer: ${token}` },
        });
        setTasks(res.data.tasks);
      } catch (err) {
        console.log(err);
      }
    }
    getTasks();
  }, []);

  return (
    <>
      <button
        style={{ marginTop: "30px" }}
        className="addTaskBtn"
        onClick={() => setShowModal(true)}
      >
        Add
      </button>
      {showModal && (
        <AddTaskModal
          addTask={(task: Task): void => {
            setTasks((prev) => [task, ...prev]);
          }}
          toggleModal={toggleModal}
        />
      )}
      <motion.div layout className={styles.taskContainer}>
        {tasks.map((el) => (
          <motion.div layout className={styles.task} key={el.id}>
            <span>{el.title}</span>
            <p>{el.content}</p>
            <span>{getRelativeTime(new Date(el.createdAt))}</span>
            <button
              onClick={async () => {
                try {
                  setTasks((prev) => prev.filter((tsk) => tsk.id !== el.id));
                  await axiosPrivate.delete(`/api/task/remove/${el.id}`, {
                    headers: { Authorization: `Bearer: ${token}` },
                  });
                } catch (err) {
                  // console.log(err);
                }
              }}
              className={styles.remove}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/484/484662.png"
                alt="delete"
              />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
