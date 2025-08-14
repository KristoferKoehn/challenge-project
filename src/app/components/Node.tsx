import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {Form, GetForm, Node} from "@/app/BlueprintGraphState"

export default function Node_Component(node_data : Node) {

    let form : Form = GetForm(node_data.data.component_id)
    


    return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>
                    {node_data.data.name}
                </CardTitle>
                <CardDescription>
                    {node_data.id}
                </CardDescription>
            </CardHeader>
            {/* <CardContent>
                {Object.entries(form?.field_schema?.properties).map(([key, value]: any, i:number) => (
                  <div key={i}>
                    {key}:{JSON.stringify(value)}
                  </div>
                ))}
                {Object.entries(node_data.data.prerequisites).map(([key, value]: any, i:number) => (
                  <div key={i}>
                    {key}:{JSON.stringify(value)}
                  </div>
                ))}
            </CardContent> */}
        </Card>
    </div>
  );
}
