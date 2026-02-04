"use client";
import { useEffect, useState } from "react"
import axios from "axios"
import UserList from "@/components/Users/UserList";

export default function HelloApi() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    axios.get("/api/hello")
    .then(res => setMsg(res.data.message));
  }, []);

  return (
  <section className="flex flex-col justify-center">
    <h1>Ответ с API: {msg}</h1>
    <UserList />
  </section>
  )
}
