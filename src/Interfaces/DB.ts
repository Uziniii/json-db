export type AllTypeString = "string" 
    | "number" 
    | "boolean"
    | "array"
    | "object"
    | "undefined" 
    | "null" 
    | "buffer"
    | "bigint"
    | "date"

export type AllType = string 
    | number 
    | boolean 
    | any[] 
    | object 
    | undefined
    | null
    | Buffer
    | BigInt
    | Date

export type CryptType = "sha256" | "sha512"

export interface Data {
    config: {
        tableSchema: {
            [key: string]: {
                [key: string]: AllTypeString
            }
        },
        keyValue: {
            [key: string]: AllTypeString
        }
    },
    index: {
        [key: string | number]: number
    },
    table: {
        [key: string]: any[][]
    }
    keyValue: {
        [key: string]: any
    }
}

export interface Options {
    cryptType?: CryptType,
    wichDataToEncrypt?: "all" | "key" | "table" | "none"
    typeChecking?: boolean
}
