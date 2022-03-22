export type AllType = "string" 
    | "number" 
    | "boolean"
    | "array"
    | "object"
    | "undefined" 
    | "null" 
    | "buffer"
    | "bigint"
    | "date"

export type CryptType = "SHA256" | "SHA512"

export interface Data {
    config: {
        tableSchema: {
            [key: string]: {
                [key: string]: AllType
            }
        },
        keyValue: {
            [key: string]: AllType
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
    password?: string,
    cryptType?: CryptType,
    typeChecking?: boolean
}
