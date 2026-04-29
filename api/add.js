module.exports = async (req,res)=>{

try{

const key=req.query.key
const nomor=String(
req.query.nomor || ""
).trim()

if(key!=="Nixx#Coming"){
return res.status(403).json({
status:false,
msg:"invalid key"
})
}

if(!nomor){
return res.json({
status:false,
msg:"nomor kosong"
})
}

const token=process.env.GITHUB_TOKEN

const api=
"https://api.github.com/repos/kanitsu77/db-bot/contents/database/nomor.json"

const get=await fetch(api,{
headers:{
Authorization:`Bearer ${token}`,
Accept:"application/vnd.github+json"
}
})

const file=await get.json()

let db=JSON.parse(
Buffer.from(
file.content,
"base64"
).toString()
)

if(!db.access) db.access=[]
if(!db.banned) db.banned=[]

if(db.access.includes(nomor)){
return res.json({
status:false,
msg:"nomor sudah ada"
})
}

db.access.push(nomor)

const content=
Buffer.from(
JSON.stringify(db,null,2)
).toString("base64")

await fetch(api,{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
message:`add ${nomor}`,
content,
sha:file.sha
})
})

res.json({
status:true,
msg:"nomor ditambahkan",
number:nomor
})

}catch(e){

res.status(500).json({
status:false,
error:String(e)
})

}

  }
