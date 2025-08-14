import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ClearDataSourceEntry,
  Form,
  GetDataSource,
  GetForm,
  GetNode,
  Node,
} from "@/app/BlueprintGraphState";
import { AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

import { Dispatch, SetStateAction} from "react";

//this is the component that displays the current form data sources. if a field has a data source, it adds a 'clear data source' button
//currently this doesn't visually update when data sources are changed, as the state of the data sources isn't being tracked correctly.
export default function Node_Component(
  node_data: Node,
  set_node: Dispatch<SetStateAction<string>>,
  set_property: Dispatch<SetStateAction<string>>,
) {
  let form: Form = GetForm(node_data.data.component_id);

  const set_selected_node_on_click = () => {
    set_node(node_data.id);
  };

  const set_selected_property_on_click = (key: string) => {
    set_property(key);
  };

  const clear_data_source_on_click = (
    node_id: string,
    property_name: string,
  ) => {
    ClearDataSourceEntry(node_id, property_name);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{node_data.data.name}</CardTitle>
          <CardAction>
            <Button asChild onClick={set_selected_node_on_click}>
              <AccordionTrigger className="w-20"></AccordionTrigger>
            </Button>
          </CardAction>
        </CardHeader>
        <AccordionContent>
          <CardContent>
            {Object.entries(form?.field_schema?.properties).map(
              ([key, value]: any, i: number) => (
                <div key={i}>
                  <DialogTrigger asChild>
                    {}
                    <Button
                      className="w-150 justify-start "
                      variant="ghost"
                      onClick={() => set_selected_property_on_click(key)}
                    >
                      {key}:{" "}
                      {
                        GetNode(GetDataSource(node_data.id, key)?.[0])?.data
                          .name
                      }
                      .{GetDataSource(node_data.id, key)?.[1]}
                    </Button>
                  </DialogTrigger>
                  {GetDataSource(node_data.id, key) ? (
                    <Button
                      variant="destructive"
                      onClick={() =>
                        clear_data_source_on_click(node_data.id, key)
                      }
                    >
                      X
                    </Button>
                  ) : null}
                </div>
              ),
            )}
          </CardContent>
        </AccordionContent>
      </Card>
    </div>
  );
}
