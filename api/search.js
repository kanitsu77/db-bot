const fs = require("fs")

module.exports = (req, res) => {
const db = JSON.parse(fs.readFileSync("./database/nomor.json"))
const num = req.query.num

if (db.banned.includes(num)) return res.end("banned")
if (db.allowed.includes(num)) return res.end("very")

res.end("nodb")
}