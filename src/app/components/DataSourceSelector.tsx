"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GetNode, GetForm, SetDataSource } from "../BlueprintGraphState";
import { Button } from "@/components/ui/button";

export default function DataSourceSelector(props: {
  selected_node_id: string;
  selected_property_name: string;
}) {
  let all_data_sources: { [key: string]: string[] } = get_data_sources(
    props.selected_node_id,
  ); //the key is the node ID, the string array is the properties available from that node
  //delete all_data_sources[props.selected_node_id];
  delete all_data_sources[props.selected_node_id];

  const on_source_selection = (
    target_node_id: string,
    target_property_name: string,
  ) => {
    SetDataSource(
      props.selected_node_id,
      props.selected_property_name,
      target_node_id,
      target_property_name,
    );
  };

  //gotta blast through the rest of this. we're almost there, just gotta make the stuff react correctly,
  // and change the buttons to reflect the new data source (if it exists), like email: Form A.email

  return (
    <Accordion type="single" collapsible>
      {Object.entries(all_data_sources).map(
        ([node_id, property_list]: any, i: number) => (
          <AccordionItem value={property_list} key={i}>
            <AccordionTrigger>{GetNode(node_id).data.name}</AccordionTrigger>
            <AccordionContent>
              {property_list.map((property: string) => (
                <div key={property}>
                  <Button
                    variant="ghost"
                    className="w-80 justify-start"
                    onClick={() => on_source_selection(node_id, property)}
                  >
                    {property}
                  </Button>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ),
      )}
    </Accordion>
  );
}

function get_data_sources(selected_node_id: string): {
  [key: string]: string[];
} {
  let current_data_sources: { [key: string]: string[] } = {};
  const Node = GetNode(selected_node_id);
  const Form = GetForm(Node.data.component_id);
  Object.keys(Form.field_schema.properties).forEach((property: string) => {
    if (current_data_sources[selected_node_id]) {
      current_data_sources[selected_node_id].push(property);
    } else {
      let list = [];
      list.push(property);
      current_data_sources[selected_node_id] = list;
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
