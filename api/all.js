const fs = require("fs")

module.exports = (req, res) => {
const db = JSON.parse(fs.readFileSync("./database/nomor.json"))
res.setHeader("Content-Type", "application/json")
res.end(JSON.stringify(db))
}