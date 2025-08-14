"use client";
import {
  Form,
  GetNode,
  GetNodes,
  SetBlueprintData,
} from "./BlueprintGraphState";
import { useEffect, useState } from "react";
import Node_Component from "../components/Node";
import { Node } from "@/app/BlueprintGraphState";
import { Accordion } from "@radix-ui/react-accordion";
import { AccordionItem } from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DataSourceSelector from "../components/DataSourceSelector";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [selected_node, setSelectedNode] = useState<string>("");
  const [selected_property, setSelectedProperty] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/test/actions/blueprints/test/graph")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        return response.json();
      })
      .then(setData);
  }, []);

  if (!data) return <div>Loading..?</div>;
  SetBlueprintData(data);
  const node_array = GetNodes();
  //call blueprint graph state => pass the data in
  //then it parses the json and we're all good!! ship it!!

  return (
    <Dialog>
      <Accordion type="single" collapsible>
        {node_array?.map((node: Node, i: number) => {
          return (
            <AccordionItem value={node.data.name} key={i} className="p-4">
              {Node_Component(node, setSelectedNode, setSelectedProperty)}
            </AccordionItem>
          );
        })}
      </Accordion>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {selected_node !== "" ? GetNode(selected_node).data.name : ""}.
            {selected_property !== "" ? selected_property : ""}
          </DialogTitle>
          <DialogDescription>Select data element to map</DialogDescription>
        </DialogHeader>
        <DataSourceSelector
          selected_node_id={selected_node}
          selected_property_name={selected_property}
        ></DataSourceSelector>{" "}
        {/* pass in selected node 
        to DataSourceSelector */}
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
