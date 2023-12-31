"use client";

import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SignupForm({
  toggleModal,
}: {
  toggleModal: () => void;
}) {
  const ctx = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    if (!error && !loading && ctx.auth.user) {
      toggleModal();
      setUserInfo({ username: "", password: "", email: "" });
    }
  }, [ctx.auth.user, error, loading, toggleModal]);

  async function handleAuth(userInfo: {
    username: string;
    email: string;
    password: string;
  }) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<{
        username: string;
        email: string;
        token: string;
      }>("/api/signup", {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
      });
      ctx.setAuth({ isAuthenticated: true, user: res.data });
      setError(null);
      setLoading(false);
      console.log(res);
    } catch (err: any) {
      setLoading(false);
      // console.log(err);
      setError(err.response.data.message);
    }
  }

  return (
    <form style={{ marginTop: "40px" }}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          value={userInfo.username}
          onChange={(e) =>
            setUserInfo((prev) => {
              return { ...prev, username: e.target.value };
            })
          }
          type="text"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          value={userInfo.email}
          onChange={(e) =>
            setUserInfo((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
          type="text"
          id="email"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo((prev) => {
              return { ...prev, password: e.target.value };
            })
          }
          type="password"
          id="password"
        />
      </div>
      {!loading && !error && <p className="loading"></p>}
      {loading && (
        <p key={"loading"} className="loading">
          Loading...
        </p>
      )}
      {error && (
        <p key={error} className="loading">
          {error}
        </p>
      )}
      <button
        className="addTaskBtn"
        onClick={async (event) => {
          event.preventDefault();
          await handleAuth(userInfo);
        }}
      >
        Sign Up
      </button>
    </form>
  );
}
