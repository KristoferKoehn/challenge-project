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
let set_data_sources: {
  [node_id: string]: {
    [property_name: string]: [string, string];
  };
} = {}; //data_sources[node_id][property_name] = [target_node_id, target_property_name]


export const GetNode = (id: string) => {
  return nodes[id];
};

export const GetNodes = () => {
  return Object.values(nodes);
};

export const GetForm = (id: string) => {
  return forms[id];
};

export const SetDataSource = (
  node_id: string,
  property_name: string,
  target_node_id: string,
  target_property_name: string,
) => {
  if (!set_data_sources[node_id]) set_data_sources[node_id] = {};
  set_data_sources[node_id][property_name] = [target_node_id, target_property_name];

  return set_data_sources;
};

export const ClearDataSourceEntry = (
  node_id: string,
  property_name: string,
) => {
  if (set_data_sources[node_id]?.[property_name]) {
    delete set_data_sources[node_id][property_name];
  }
};

export const GetDataSource = (node_id: string, property_name: string) => {
  return set_data_sources[node_id]?.[property_name];
};

export const GetDataSources = () => {
  return set_data_sources;
};

  
//this combs through the data from the server and constructs the 'global' data source items
export const SetBlueprintData = (data: any) => {
  const forms_list = data?.forms ?? [];
  const nodes_list = data?.nodes ?? [];

  const globalNode: Node = {
    id: "GLOBAL",
    type: "Form",
    position: { x: 0, y: 0 },
    data: {
      id: "GLOBAL",
      component_key: "Form",
      component_id: "FORMGLOBAL",
      name: "Global",
      prerequisites: [],
    },
  };

  const globalForm: Form = {
    $schema: "",
    created_at: new Date().toISOString(),
    created_by: "system",
    custom_javascript: "",
    custom_javascript_functions: "",
    custom_javascript_triggering_fields: null,
    description: "Global form with email and id fields",
    dynamic_field_config: {},
    field_schema: {
      additional_properties: {},
      properties: {
        email: { type: "string", format: "email" },
        id: { type: "string" },
      },
      required: [],
      type: "object",
    },
    id: "FORMGLOBAL",
    is_reusable: true,
    name: "FORMGlobal",
    ui_schema: {
      elements: null,
      type: "VerticalLayout",
    },
    updated_at: new Date().toISOString(),
  };

  forms_list.forEach((form: Form) => {
    forms[form.id] = form;
  });

  nodes_list.forEach((node: Node) => {
    if (!node.data.prerequisites.includes("GLOBAL")) {
      node.data.prerequisites.push("GLOBAL");
    }
  });

  nodes_list.forEach((node: Node) => {
    nodes[node.id] = node;
  });

  forms[globalForm.id] = globalForm;
  nodes[globalNode.id] = globalNode;
};
