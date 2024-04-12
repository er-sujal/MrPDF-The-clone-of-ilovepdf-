const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync("D:\\pdf_tools\\templets\\Split\\SplitPDF.html", "utf8");
const dom = new JSDOM(html);


const document = dom.window.document;

const PDFMerger = require('pdf-merger-js')


var marger = new PDFMerger();


const PDFSpilt = async (pdf,range) => {
    await marger.add(pdf,range);
    let d=new Date().getTime();
    await marger.save(`public/${d}.pdf`);
    return d;
} 
module.exports = {PDFSpilt}


// Write the updated HTML to a new file
