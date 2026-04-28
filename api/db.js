module.exports = async (req,res)=>{

const token=process.env.GITHUB_TOKEN

const api=
"https://api.github.com/repos/kanitsu77/db-bot/contents/database/nomor.json"

if(req.method==="GET"){

const r=await fetch(api,{
headers:{
Authorization:`Bearer ${token}`
}
})

const file=await r.json()

const data=JSON.parse(
Buffer.from(
file.content,
"base64"
).toString()
)

return res.json(data)

}

if(req.method==="POST"){

let body=req.body

const get=await fetch(api,{
headers:{
Authorization:`Bearer ${token}`
}
})

const file=await get.json()

let data=JSON.parse(
Buffer.from(
file.content,
"base64"
).toString()
)

if(body.action==="add"){
data.push({
id:Date.now(),
number:body.number,
status:"active"
})
}

if(body.action==="delete"){
data=data.filter(
v=>v.number!=body.number
)
}

if(body.action==="ban"){
data=data.map(v=>
v.number==body.number
? {...v,status:"banned"}
:v
)
}

if(body.action==="unban"){
data=data.map(v=>
v.number==body.number
? {...v,status:"active"}
:v
)
}

const content=
Buffer.from(
JSON.stringify(data,null,2)
).toString("base64")

await fetch(api,{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
message:"update db",
content,
sha:file.sha
})
})

return res.json({
success:true
})

}

              }
