import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PayloadField = {};

type DynamicFieldConfig = {
  endpoint_id: string;
  output_key: string;
  payload_fields: { [key: string]: PayloadField };
  selector_field : string
};

type FieldSchema = {
  additional_properties : {[key: string] : any}
  properties : {[key: string] : any}
  required: [] | null
  type: string
}

type UISchema = {
  elements : [] | null
  type : string
}

export type Form = {
  $schema: string;
  created_at: string;
  created_by: string;
  custom_javascript: string;
  custom_javascript_functions: string;
  custom_javascript_triggering_fields: Array<string> | null;
  description: string;
  dynamic_field_config: { [key: string]: DynamicFieldConfig };
  field_schema : FieldSchema
  id: string
  is_reusable: boolean
  name : string
  ui_schema : UISchema
  updated_at : string
};


export default function Form_Component(form_data : Form) {
    return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>
                    {form_data.name}
                </CardTitle>
                <CardDescription>
                    {form_data.id}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {form_data.created_by}
                {Object.entries(form_data.field_schema.properties).map(([key, value]: any, i:number) => (
                  <div key={i}>
                    {key}:{JSON.stringify(value)}
                  </div>
                ))}
                {/* <div className="grid w-full max-w-sm items-center gap-3">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
                </div> */}
            </CardContent>
        </Card>
    </div>
  );
}
