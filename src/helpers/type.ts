import typeOf from "typeof"
import { AllType } from "../Interfaces/DB"

export const types = {
    string:    true,
    number:    true,
    boolean:   true,
    array:     true,
    object:    true,
    undefined: true,
    null:      true,
    buffer:    true,
    bigint:    true,
    date:      true,
}

export function checkType(value: string, type: string): boolean {
    if (!types[type]) throw new Error("This type is not supported")
    return typeOf(value) === type
}
