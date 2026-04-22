import fs from "fs"

export default function handler(req,res){

const db = JSON.parse(fs.readFileSync("./database/nomor.json"))
const num = req.query.num

if(db.banned.includes(num)) return res.send("banned")
if(db.allowed.includes(num)) return res.send("very")

res.send("nodb")
}
