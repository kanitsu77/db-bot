module.exports = async (req,res)=>{

try{

const nomor=String(
req.query.nomor || ""
).trim()

if(!nomor){
return res.json({
status:false,
allowed:false,
msg:"nomor kosong"
})
}

const token=process.env.GITHUB_TOKEN

const r=await fetch(
"https://api.github.com/repos/kanitsu77/db-bot/contents/database/nomor.json",
{
headers:{
Authorization:`Bearer ${token}`,
Accept:"application/vnd.github+json"
}
}
)

const file=await r.json()

const db=JSON.parse(
Buffer.from(
file.content,
"base64"
).toString()
)

const access=db.access || []
const banned=db.banned || []

const registered=
access.includes(nomor)

const isBanned=
banned.includes(nomor)

if(
registered &&
!isBanned
){
return res.json({
status:true,
allowed:true,
banned:false,
number:nomor
})
}

if(isBanned){
return res.json({
status:false,
allowed:false,
banned:true,
number:nomor
})
}

return res.json({
status:false,
allowed:false,
banned:false,
number:nomor
})

}catch(e){

res.status(500).json({
error:String(e)
})

}

}
