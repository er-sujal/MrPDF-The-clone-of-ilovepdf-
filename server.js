const express = require('express')
const multer = require('multer')
const { PDFSpilt } = require('./SpiltPDf')
const path = require('path')
const upload = multer({dest:'upload/'})
const fs = require("fs");

const app = express()
const port = 3000

app.use('/static', express.static('public'))
app.use(express.static('templets'))
app.use(express.urlencoded({ extended: true })); // Add this line to parse urlencoded form data

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "\\templets\\Main\\index.html"))
})

app.get('/mergeTRY', (req,res)=>{
  app.use(express.static('Merge'))
  res.sendFile(path.join(__dirname, "\\templets\\Merge\\MargePDF.html"))
})

app.post('/merge', upload.array('pdfs',100) ,async (req, res, next )=>{
  let range, pages;

  if (req.body['range-input']) {
    range = req.body['range-input'];
  } else if (req.body['pages-input']) {
    range = req.body['pages-input'];
  }
  
  // console.log(range);
  // console.log(pages);
    let d=await PDFSpilt(path.join(__dirname,req.files[0].path), (range))
    res.redirect(`http://localhost:3000/static/${d}.pdf`)
})

app.listen(port, () => {
  console.log(`🔥Mr.PDF🔥 is listening on port http://localhost:${port}`)
})