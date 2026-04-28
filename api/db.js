module.exports = async (req,res)=>{
try{
const token=process.env.GITHUB_TOKEN

const api=
"https://api.github.com/repos/kanitsu77/db-bot/contents/database/nomor.json"

const getFile=async()=>{
const r=await fetch(api,{
headers:{
Authorization:`Bearer ${token}`,
Accept:"application/vnd.github+json"
}
})
return await r.json()
}

if(req.method==='GET'){
const file=await getFile()

const data=JSON.parse(
Buffer.from(
file.content,
'base64'
).toString()
)

return res.json(data)
}

if(req.method==='POST'){
const body=req.body
const action=body.action
const number=String(body.number)

const file=await getFile()

let db=JSON.parse(
Buffer.from(
file.content,
'base64'
).toString()
)

if(!db.access) db.access=[]
if(!db.banned) db.banned=[]

if(action==='add'){
if(!db.access.includes(number)){
db.access.push(number)
}
}

if(action==='delete'){
db.access=db.access.filter(v=>v!==number)
db.banned=db.banned.filter(v=>v!==number)
}

if(action==='ban'){
if(!db.banned.includes(number)){
db.banned.push(number)
}
}

if(action==='unban'){
db.banned=db.banned.filter(v=>v!==number)
}

const content=
Buffer.from(
JSON.stringify(db,null,2)
).toString('base64')

await fetch(api,{
method:'PUT',
headers:{
Authorization:`Bearer ${token}`,
'Content-Type':'application/json'
},
body:JSON.stringify({
message:'update whitelist db',
content,
sha:file.sha
})
})

return res.json({success:true})
}

}catch(e){
res.status(500).json({
error:String(e)
})
}
   }
