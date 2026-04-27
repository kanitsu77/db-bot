export default async function handler(req,res){

const nomor=req.query.nomor

if(!nomor){
return res.json({
status:false,
msg:"nomor kosong"
})
}

const token=process.env.GITHUB_TOKEN

const r=await fetch(
"https://api.github.com/repos/kanitsu77/db-bot/contents/database/nomor.json",
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

const file=await r.json()

const data=JSON.parse(
Buffer.from(
file.content,
"base64"
).toString()
)

const found=data.find(
v=>v.number===nomor && v.status==="active"
)

if(found){
return res.json({
status:true,
allowed:true
})
}

res.json({
status:false,
allowed:false
})

}
