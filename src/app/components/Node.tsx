import { Form } from "./Form"

//we're just going to pull in the bare minimum for this stuff
type NodePosition = {
    x:number
    y:number
}

type NodeData = {
    id: string
    component_key: string
    component_id: string
    name: string
    prerequisites: string[]
}

type Node = {
    id: string
    type: string //component type is assumed 'Form' in this case
    position: NodePosition
    data: NodeData
}

export default function Node_Component(node: Node, form: Form) {

} 