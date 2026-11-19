const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

// Find and replace the remaining href={doc.url_dokumen} for the Download button (Dokumen Mutu)
const oldStr = 'href={doc.url_dokumen} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded inline-flex items-center transition"><Download className="w-4 h-4" /></a>';
const newStr = 'href={getGDrivePreviewUrl(doc.url_dokumen)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded inline-flex items-center transition"><Download className="w-4 h-4" /></a>';

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  console.log('Replaced Dokumen Mutu download link!');
} else {
  console.log('String not found!');
}

console.log('All getGDrivePreviewUrl usages:', (content.match(/getGDrivePreviewUrl/g) || []).length);
fs.writeFileSync('src/app/page.js', content, 'utf8');
