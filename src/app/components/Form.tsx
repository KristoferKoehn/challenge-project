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
