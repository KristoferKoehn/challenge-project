import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, GetForm, Node } from "@/app/BlueprintGraphState";
import { AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

import { Dispatch, SetStateAction } from "react";

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
                    <Button
                      className="w-120 justify-start "
                      variant="link"
                      onClick={() => set_selected_property_on_click(key)}
                    >
                      {key}
                    </Button>
                    {/* put 2nd x button on the right hand side if there is a data source already set 
                     change button type based on state? like give dotted outline if no data source */}
                  </DialogTrigger>
                </div>
              ),
            )}
          </CardContent>
        </AccordionContent>
      </Card>
    </div>
  );
}

{
  /* {Object.entries(node_data.data.prerequisites).map(
            ([key, value]: any, i: number) => (
              <div key={i}>
                {key}:{JSON.stringify(value)}
              </div>
            ),
          )} */
}
