import { JsonDB, Table, Schema } from "../src/index"
import { resolve } from "path"
import assert from "assert"

const db = new JsonDB(resolve(__dirname, "..", "db", "db.json"), {
    // password: "azerty123",
    typeChecking: true
})

const tokenValue = "youtube_token"

describe("Database test", async () => {
    it("Database should be loaded", async () => {
        await db.load()

        assert.equal(db.loaded, true, "Database have not been loaded")
    })

    it("Database should be saved", async () => {
        const state = db.save()
    
        assert.equal(state, "success", "Save state has to be 'success'")
    })

    describe("Key value test", async () => {
        it("Should create a string key named 'token'", async () => {
            db.setKey("token", tokenValue)
            
            assert.equal(Object.hasOwn(db.data.config.keyValue, "token"), true, "Config key does'nt been created")
            assert.equal(db.data.config.keyValue["token"], "string", "Config key is not of type 'string'")
            assert.equal(db.data.keyValue["token"], tokenValue, "Key value isn't 'token'")
        })
    
        it("Should retrieve 'token' value", () => {
            const key = db.getKey("token")
        
            assert.equal(key, tokenValue, `Should retieve '${tokenValue}' from 'token' key`)
        })

        it("Should erase 'token' key", async () => {
            // console.log(db.data)
            db.eraseKey("token")
    
            assert.equal(Object.hasOwn(db.data.config.keyValue, "token"), false, "Config key 'token' should be removed")
            assert.equal(Object.hasOwn(db.data.keyValue, "token"), false, "Key 'token' should be removed")
        })
    })
})