import { Schema } from "./Schema"

export class Table {
    public name: string

    constructor (name: string, schema: Schema) {
        this.name = name
    }
}
