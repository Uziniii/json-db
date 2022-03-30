import { AllType, AllTypeString, CryptType } from "../Interfaces/DB";
import sha from "sha.js"
import { typeOf } from "./type"

export function encrypt(cryptType: CryptType, value: AllType): string {
    const encrypt = (value: string) => sha(cryptType).update(value).digest("hex").toString()

    switch (typeOf(value) as AllTypeString) {
        case "string":
        case "number":
        case "buffer":
            value = value as string | number | Buffer
            return encrypt(value.toString())

        case "array":
        case "object":
        case "boolean":
        case "null":
        case "undefined":
            value = value as null | undefined | boolean | any[] | object
            return encrypt(JSON.stringify(value))


        default:
            return ""
    }
}