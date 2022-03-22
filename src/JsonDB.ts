import { sync as writeFileSync } from "write-file-atomic"
import { readFile, writeFile } from "fs/promises"
import { existsSync } from "fs"
import { AllType, Data, Options } from "./Interfaces/DB"
import sha from "sha.js"
import typeOf from "typeof"
import { checkType } from "./helpers/type"

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

    constructor (path: string, options?: Options) {
        this.path = path
        this.options = Object.assign({
            typeChecking: false,
        }, options)

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

            this.data.config.keyValue[key] = typeOf(value) as AllType
            this.data.keyValue[key] = value
            this.save()
            return
        }

        // Type checking
        if (this.options.typeChecking && !checkType(value, typeOf(configKey))) 
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
