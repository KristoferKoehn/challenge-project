type PayloadField = {};

type DynamicFieldConfig = {
  endpoint_id: string;
  output_key: string;
  payload_fields: { [key: string]: PayloadField };
  selector_field: string;
};

type FieldSchema = {
  additional_properties: { [key: string]: any };
  properties: { [key: string]: any };
  required: [] | null;
  type: string;
};

type UISchema = {
  elements: [] | null;
  type: string;
};

export type Form = {
  $schema: string;
  created_at: string;
  created_by: string;
  custom_javascript: string;
  custom_javascript_functions: string;
  custom_javascript_triggering_fields: Array<string> | null;
  description: string;
  dynamic_field_config: { [key: string]: DynamicFieldConfig };
  field_schema: FieldSchema;
  id: string;
  is_reusable: boolean;
  name: string;
  ui_schema: UISchema;
  updated_at: string;
};

//we're just going to pull in the bare minimum for this stuff
type NodePosition = {
  x: number;
  y: number;
};

type NodeData = {
  id: string;
  component_key: string;
  component_id: string;
  name: string;
  prerequisites: string[];
};

export type Node = {
  id: string;
  type: string; //component type is assumed 'Form' in this case
  position: NodePosition;
  data: NodeData;
};

let nodes: { [key: string]: Node } = {};
let forms: { [key: string]: Form } = {};
let data_source: { [key: string]: string } = {};

export const GetNode = (id: string) => {
  return nodes[id];
};

export const GetNodes = () => {
  return Object.values(nodes);
};

export const GetForm = (id: string) => {
  return forms[id];
};

export const SetBlueprintData = (data: any) => {
  const forms_list = data?.forms ?? [];
  const nodes_list = data?.nodes ?? [];

  forms_list.forEach((form: Form) => {
    forms[form.id] = form;
    console.log(form.id)
  });

  nodes_list.forEach((node: Node) => {
    nodes[node.id] = node;
  });
};

export const GetAssociatedNodes = (id: string) => {};
