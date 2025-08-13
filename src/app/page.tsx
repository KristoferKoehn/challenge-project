"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

//make types for form

export default function Home() {
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/test/actions/blueprints/test/graph")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      return response.json()
    })
    .then(setData)

  }, [])

  if (!data) return <div>Loading..?</div>

  return (
    <div>{JSON.stringify(data, null, '\t')}</div>
  );
}
