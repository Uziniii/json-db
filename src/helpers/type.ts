import { AllTypeString } from "../Interfaces/DB"

type AllTypeStringForTypeFunction = AllTypeString | "symbol" | "function"

let toString = Object.prototype.toString;

export function typeOf(object: any): AllTypeStringForTypeFunction {
    let type: AllTypeStringForTypeFunction = typeof object;

    if (type === 'undefined') {
        return 'undefined';
    }

    if (object) {
        type = object.constructor.name;
    } else if (type === 'object') {
        type = toString.call(object).slice(8, -1) as AllTypeStringForTypeFunction;
    }

    return type.toLowerCase() as AllTypeStringForTypeFunction
    ;
}

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
