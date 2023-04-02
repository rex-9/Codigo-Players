import { useState } from "react";
import { setCookie } from "../services/cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const login = (username) => {
    if (username !== "") {
      setCookie("token", username);
      window.location.reload();
    } else {
      setError("Username is Required!");
    }
  };
  return (
    <section
      id="login"
      className="flex flex-col justify-center items-center h-[80vh]"
    >
      <div>
        <h1 className="text-xl font-bold">Login</h1>
        <label htmlFor="Username">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          className="my-4 ml-2 border-2 border-gray-300 rounded-lg px-2 py-1"
          type="text"
          placeholder="Username"
          name="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <p className="text-red-500 mb-2">{error}</p>
        <button
          className="button bg-green-300 w-full"
          onClick={() => login(username)}
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default Login;
