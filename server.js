const express = require('express');
const app = express();
const formidable = require('formidable')
const cors = require('cors');
const fs = require('fs');


app.use(cors())
app.get('/',(req,res)=>{
    res.send('farid')
})

app.post('/upload-image',(req,res)=>{
    const form = formidable();
    form.parse(req,(error,fields,files)=>{
        if(!error){
            if(files){
                let {originalFilename,filepath} = files.file;
                originalFilename = Date.now() + originalFilename;
                const uploadPath = __dirname + `/public/image/${originalFilename}`;
                fs.copyFile(filepath,uploadPath,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        res.status(200).json({message : 'Success'})
                    }
                })
            }
        }
    })
})


app.listen(5000,()=>{
    console.log('server is running port 5000');
})
