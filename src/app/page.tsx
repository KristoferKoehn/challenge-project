"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Form_Component, { Form } from "./components/Form";


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

  
   // extracting form array from json
  if (!data) return <div>Loading..?</div>
  const form_array = data.forms ?? [];


  return (
        <div>
      {form_array?.map((form: Form, i:number) => {
        return (
          <div key={i} className="py-10">
            {Form_Component(form)}
          </div>
        )
      })}
    </div>
  );
}
