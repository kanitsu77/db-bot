module.exports = async (req,res)=>{

try{

const token=process.env.GITHUB_TOKEN

if(!token){
return res.status(500).json({
error:"ENV token tidak ada"
})
}

const response=await fetch(
"https://api.github.com/repos/kanitsu77/db-bot/contents/database/nomor.json",
{
headers:{
Authorization:`Bearer ${token}`,
Accept:"application/vnd.github+json"
}
}
)

const file=await response.json()

if(file.message){
return res.status(500).json(file)
}

if(!file.content){
return res.status(500).json({
error:"content kosong",
raw:file
})
}

const decoded=
Buffer
.from(
file.content,
"base64"
)
.toString()

const data=JSON.parse(decoded)

return res.status(200).json(data)

}catch(err){

return res.status(500).json({
error:String(err)
})

}

}
