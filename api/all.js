import fs from "fs"

export default function handler(req,res){
const db = JSON.parse(fs.readFileSync("./database/nomor.json"))
res.json(db)
}
