import axios from "axios";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { redirect } = router.query;

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(email,passowrd)

    const data = { email, password };

    try {
      axios.post("/api/login", { email, password }).then((res) => {
        if (res.status == 200) {
          Cookies.set("user", JSON.stringify(res?.data?.user), {
            expires: 0.041,
          });
          router.push(redirect || "/");
        }
      });
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div
      className="grid place-items-center h-screen"
      style={{ backgroundColor: "#202024" }}
    >
      <div
        className="shadow-lg p-5 w-[40%] rounded-lg  border-t-8 border-white"
        style={{ backgroundColor: "#29292D" }}
      >
        <h1 className="font-bold my-4 text-white text-xl">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
            id="form-input"
            type="email"
            placeholder="Email"
          ></input>
          <input
            onChange={(ev) => setPassword(ev.target.value)}
            value={password}
            id="form-input"
            type="password"
            placeholder="Password"
          ></input>
          <button className="border border-black text-white font-bold py-2 px-6 cursor-pointer">
            Login
          </button>
          <div onClick={handleLogin} className="text-yellow-600 cursor-pointer">
            Login with google
          </div>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link
            href="/register"
            className="text-sm text-white mt-3 text-right "
          >
            Don't have an account? <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
