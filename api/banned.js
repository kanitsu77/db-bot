const fs = require("fs")

module.exports = (req, res) => {
const db = JSON.parse(fs.readFileSync("./database/nomor.json"))
const { num } = req.body

if (!db.banned.includes(num)) db.banned.push(num)

fs.writeFileSync("./database/nomor.json", JSON.stringify(db, null, 2))
res.end("ok")
}