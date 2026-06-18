import fs from 'fs'
import path from 'path'
import PDFDocument from 'pdfkit'

function addParagraph(doc, text){
  const paragraphs = text.split(/\n\n+/)
  for(const p of paragraphs){
    doc.text(p.trim(), {paragraphGap:8})
  }
}

const htmlPath = path.resolve(process.cwd(),'presentation.html')
const outPath = path.resolve(process.cwd(),'presentation_pdfkit.pdf')
if(!fs.existsSync(htmlPath)){
  console.error('presentation.html not found')
  process.exit(1)
}

const raw = fs.readFileSync(htmlPath,'utf8')
// crude conversion: strip tags and keep headings
let text = raw.replace(/<script[\s\S]*?<\/script>/gi,'')
text = text.replace(/<style[\s\S]*?<\/style>/gi,'')
text = text.replace(/<(\/)?h1[^>]*>/gi,'\n\n# ')
text = text.replace(/<(\/)?h2[^>]*>/gi,'\n\n## ')
text = text.replace(/<li[^>]*>/gi,'\n - ')
text = text.replace(/<\/li>/gi,'')
text = text.replace(/<[^>]+>/g,'')
text = text.replace(/&nbsp;/g,' ')
text = text.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&')

const doc = new PDFDocument({margin:50,size:'A4'})
doc.pipe(fs.createWriteStream(outPath))
doc.fontSize(20).text('Kitch n Break — Projektübersicht', {underline:true})
doc.moveDown()
doc.fontSize(10).fillColor('gray').text('Erstellt: ' + new Date().toLocaleString('de-DE'))
doc.moveDown()
doc.fillColor('black').fontSize(11)

addParagraph(doc, text)

doc.end()
console.log('Wrote', outPath)
