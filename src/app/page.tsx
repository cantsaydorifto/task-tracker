"use client";
import Tasks from "@/components/task";
import styles from "./page.module.css";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const ctx = useAuth();

  if (!ctx.auth.user)
    return (
      <main className={styles.main}>
        <h1>Not Logged In</h1>
      </main>
    );
  return (
    <main className={styles.main}>
      <h1>Tasks</h1>
      <Tasks token={ctx.auth.user.token} />
    </main>
  );
}
