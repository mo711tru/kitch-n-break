import fs from 'fs'
import path from 'path'
import puppeteer from 'puppeteer'

async function main(){
  const htmlPath = path.resolve(process.cwd(),'presentation.html')
  const out = path.resolve(process.cwd(),'presentation.pdf')
  if(!fs.existsSync(htmlPath)){
    console.error('presentation.html not found')
    process.exit(1)
  }
  const html = fs.readFileSync(htmlPath,'utf8').replace('<!--DATE-->', new Date().toLocaleString('de-DE'))

  const browser = await puppeteer.launch({args:['--no-sandbox','--disable-setuid-sandbox']})
  const page = await browser.newPage()
  await page.setContent(html, {waitUntil:'networkidle0'})
  await page.pdf({path: out, format: 'A4', printBackground:true, margin:{top:'20mm',bottom:'20mm',left:'15mm',right:'15mm'}})
  await browser.close()
  console.log('Wrote', out)
}

main().catch(err=>{ console.error(err); process.exit(1) })
