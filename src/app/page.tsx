"use client"
import { Form, GetNodes, SetBlueprintData } from "./BlueprintGraphState";
import { useEffect, useState } from "react";
import Node_Component from "./components/Node";
import {Node} from "@/app/BlueprintGraphState"



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
  SetBlueprintData(data)
  const node_array = GetNodes()
  //call blueprint graph state => pass the data in
  //then it parses the json and we're all good!! ship it!!

  return (
    <div>
      {node_array?.map((node: Node, i:number) => {
        return (
          <div key={i} className="py-2">
            {Node_Component(node)}
          </div>
        )
      })}
    </div>
  );
}

