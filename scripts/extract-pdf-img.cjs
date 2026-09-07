const fs = require('fs');
const path = require('path');

const pdfPath = 'd:/kautikecharitable/public/documents/raigad-school-appreciation-letter.pdf';
const buf = fs.readFileSync(pdfPath);
const str = buf.toString('latin1');

let start = 0;
let imgCount = 0;
while (true) {
  const soi = str.indexOf('\xFF\xD8\xFF', start);
  if (soi === -1) break;
  const eoi = str.indexOf('\xFF\xD9', soi + 3);
  if (eoi === -1) break;
  const imgBuf = buf.subarray(soi, eoi + 2);
  const outPath = `d:/kautikecharitable/public/images/awards/raigad-school-appreciation-letter-${imgCount}.jpg`;
  fs.writeFileSync(outPath, imgBuf);
  console.log(`Extracted JPEG image ${imgCount}, size: ${imgBuf.length} bytes to ${outPath}`);
  imgCount++;
  start = eoi + 2;
}
if (imgCount === 0) {
  console.log('No raw JPEG markers found, copying screenshot or rendering...');
}
