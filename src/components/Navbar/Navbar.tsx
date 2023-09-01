"use client";
import styles from "./navbar.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "../authForms/LoginForm";
import SignupForm from "../authForms/SignupForm";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";

export default function Navbar() {
  const {
    auth: { user },
  } = useAuth();
  const logout = useLogout();

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const [loginForm, setLoginForm] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2387/2387635.png"
            alt="Tasks"
          />
          <span>Tasks</span>
        </Link>
        <div>
          {/* <span>Logged in as {!!user ? user.username : "none"}</span> */}
          {user ? (
            <button
              key="logout"
              onClick={() => logout()}
              className={styles.logOut}
            >
              Log Out
            </button>
          ) : (
            <button key="login" onClick={() => toggleModal()}>
              Login
            </button>
          )}
        </div>
      </nav>
      {showModal && (
        <Modal id={loginForm ? 1 : 0} toggleModal={toggleModal}>
          <h1 style={{ fontSize: "1.5rem" }}>
            {!loginForm ? "Sign Up" : "Log In"}
          </h1>
          {loginForm ? (
            <LoginForm toggleModal={toggleModal} />
          ) : (
            <SignupForm toggleModal={toggleModal} />
          )}
          <div>
            {loginForm ? "New to Tasks? " : "Already on Tasks? "}
            <button onClick={() => setLoginForm((prev) => !prev)}>
              {loginForm ? "Sign Up" : "Login"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
