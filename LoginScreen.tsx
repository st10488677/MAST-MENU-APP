import React, { useState } from "react";

interface Props {
  onLogin: (type: "customer" | "chef") => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-black text-white p-6 rounded-xl w-80">
      <h1 className="text-center mb-4 text-xl font-bold">Menu Master</h1>
      <input
        className="w-full mb-2 p-2 rounded text-black"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="w-full mb-4 p-2 rounded text-black"
        placeholder="Enter password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          onClick={() => onLogin("customer")}
          className="bg-green-600 flex-1 p-2 rounded"
        >
          Customer
        </button>
        <button
          onClick={() => onLogin("chef")}
          className="bg-blue-600 flex-1 p-2 rounded"
        >
          Chef
        </button>
      </div>
    </div>
  );
}
