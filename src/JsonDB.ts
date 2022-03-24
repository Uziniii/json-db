import { sync as writeFileSync } from "write-file-atomic"
import { readFile, writeFile } from "fs/promises"
import { existsSync } from "fs"
import { AllTypeString, Data, Options } from "./Interfaces/DB"
import sha from "sha.js"
import { checkType, typeOf } from "./helpers/type"

export class JsonDB {
    public path: string
    public data: Data = {
        config: {
            keyValue: {},
            tableSchema: {}
        },
        index: {},
        table: {},
        keyValue: {}
    }
    public options: Options
    public loaded: boolean = false
    public keyEncrypt: boolean = false
    public tableEncrypt: boolean = false

    constructor (path: string, options?: Options) {
        this.path = path
        this.options = Object.assign({
            typeChecking: false,
            wichDataToEncrypt: "none"
        }, options)

        switch (this.options.wichDataToEncrypt) {
            case "all":
                this.tableEncrypt = true
                this.keyEncrypt = true
                break
        
            case "key":
                this.keyEncrypt = true
                break

            case "table":
                this.tableEncrypt = true
                break

            case "none":
            default:
                this.tableEncrypt = false
                this.keyEncrypt = false
                break;
        }

        // Save on error and exit
        process.on("uncaughtException", this.save)
        process.on("exit", this.save)
    }

    // Load file if it exist and if not, write it
    public async load() {
        if (existsSync(this.path)) {
            try {
                this.data = JSON.parse((await readFile(this.path)).toString())
                this.loaded = true
            } catch (err) {
                throw console.error(err)
            }
        } else {
            try {
                await writeFile(this.path, JSON.stringify(this.data))
                this.loaded = true
            } catch (err) {
                throw console.error(err)
            }
        }
    }

    public save() {
        if (!this.loaded) return "not loaded"
        let state: string

        try {
            writeFileSync(this.path, JSON.stringify(this.data))
            state = "success"
        } catch (err) {
            console.error(err)
            state = "error"
        }

        return state
    }

    public getKey(key: string) {
        if (this.data.config.keyValue[key] === undefined) return console.error(new Error("This key does'nt exist"))
        return this.data.keyValue[key]
    }

    public setKey(key: string, value: any) {
        let configKey = this.data.config.keyValue[key]
        
        // Create key if it doesn't exist
        if (configKey === undefined) {
            if (!checkType(value, typeOf(value))) return console.error(new Error("This type is not supported"))

            this.data.config.keyValue[key] = typeOf(value) as AllTypeString

            // if ()
            this.data.keyValue[key] = value
            this.save()
            return
        }

        // Type checking
        if (this.options.typeChecking && !checkType(value, configKey)) 
            return console.error(new Error(`The type value is "${typeOf(value)}" and it as to be "${configKey}"`))

        this.data.keyValue[key] = value
        this.save()
    }

    public eraseKey(key: string) {
        delete this.data.config.keyValue[key]
        delete this.data.keyValue[key]

        this.save()
    }

    public createTable() {

    }
}
