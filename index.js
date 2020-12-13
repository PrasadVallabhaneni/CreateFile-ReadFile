

var path = require("path");
var fs=require('fs');
const express=require('express');
const app=express();
var port = process.env.PORT || 3001;

app.get('/createFile',(req,res)=>{
  var date=new Date();
fs.writeFile(`./createdFiles/${date}.txt`, "Hello", (err) => {
  if (err) throw err;
  res.status(200).json({message:'File Created'})
});
})
app.listen(port,()=>console.log(port));
app.get("/files",(req,res)=>{
    fs.opendir("./createdFiles", async (err, dir) => {
      if (err) throw err;
      var content;
      var type;
      var ext;
      for await (const dirent of dir) {
        ext = path.extname(dirent.name);
        if (dirent.isDirectory()) {
          type = "Folder";
        } else if (ext == ".pdf") {
          type = "PDF File";
        } else if (ext == ".html") {
          type = "HTML File";
        } else if (ext == ".png") {
          type = "Image";
        }else if(ext=='.txt'){
          type = "TextFile";
        }
        content += `<li><button type="button" class="btn btn-primary" style="margin:10px;padding:10px; color:#09327D">
  ${dirent.name} <span class="badge badge-light"> --${type} </span>
</button></li>`;
      }

      div = `
    <ul>${content}</ul>
`;

      res.send(div);
    });
   
})
