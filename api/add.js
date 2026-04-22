import fs from "fs"

export default function handler(req,res){

const db = JSON.parse(fs.readFileSync("./database/nomor.json"))

const num = req.body

if(!db.allowed.includes(num)){
db.allowed.push(num)
}

fs.writeFileSync("./database/nomor.json",JSON.stringify(db,null,2))

res.send("ok")
}
