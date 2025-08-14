"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Node, GetNode, GetForm } from "../BlueprintGraphState";

export default function DataSourceSelector(props: { node_id: string }) {
  let all_data_sources: { [key: string]: string[] } = get_data_sources(
    props.node_id,
  );//the key is the node ID, the string array is the properties available from that node
  //delete all_data_sources[props.node_id];
  delete all_data_sources[props.node_id]

  return (
    <Accordion type="single" collapsible>
      {Object.entries(all_data_sources).map(([key, value]: any, i: number) => (
        <AccordionItem value={value} key={i}>
          <AccordionTrigger>{GetNode(key).data.name}</AccordionTrigger>
          <AccordionContent>{value.map((property:string) => ( 
            <p key={property}>{property}</p>
          ))}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function get_data_sources(node_id: string): { [key: string]: string[] } {
  let current_data_sources: { [key: string]: string[] } = {};
  const Node = GetNode(node_id);
  const Form = GetForm(Node.data.component_id);
  Object.keys(Form.field_schema.properties).forEach((property: string) => {
    if (current_data_sources[node_id]) {
        current_data_sources[node_id].push(property);
    } else {
        let list = []
        list.push(property)
        current_data_sources[node_id] = list
    }
 
  });

  Node.data.prerequisites.forEach((prerequisite) => {
    current_data_sources = {
      ...current_data_sources,
      ...get_data_sources(prerequisite),
    };
  });

  return current_data_sources;
}
