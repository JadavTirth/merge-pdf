const express = require('express')
const path = require('path')
const app = express()
const multer = require('multer')
const { mergePdfs } = require('./merge');
const upload = multer({dest : 'uploads/'})
app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"))
})

app.post('/merge',upload.array('pdfs',2), async(req, res, next)  =>  {
    console.log("req .file")
    mergePdfs(path.join(__dirname, req.file[0].path), path.join(__dirname, req.file[1].path))
  await res.redirect(`/static/merged.pdf`)

    
  })
  
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})