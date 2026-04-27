export default async function handler(req,res){

const token=process.env.GITHUB_TOKEN
const owner="kanitsu77"
const repo="db-bot"
const path="database/nomor.json"

const api=`https://api.github.com/repos/${owner}/${repo}/contents/${path}`

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

return res.status(200).json({
data,
sha:file.sha
})

}


if(req.method==="POST"){

const body=req.body
const action=body.action

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

if(action==="add"){
data.push({
id:Date.now(),
number:body.number,
status:"active"
})
}

if(action==="ban"){
data=data.map(v=>
v.number==body.number
? {...v,status:"banned"}
: v
)
}

if(action==="unban"){
data=data.map(v=>
v.number==body.number
? {...v,status:"active"}
: v
)
}

if(action==="delete"){
data=data.filter(
v=>v.number!=body.number
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
message:"update db panel",
content,
sha:file.sha
})
})

return res.json({
success:true
})

}

  }
