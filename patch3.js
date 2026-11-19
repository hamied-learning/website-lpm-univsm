const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

// Replace Dokumen Mutu link (Download icon)
content = content.replace(
  /\{doc\.url_dokumen \? \( <a href=\{doc\.url_dokumen\} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded inline-flex items-center transition"><Download className="w-4 h-4" \/><\/a>\n\s*\) : \( <span className="text-xs text-red-500">No Link<\/span> \)\}/,
  `{doc.url_dokumen ? ( <a href={getGDrivePreviewUrl(doc.url_dokumen)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded inline-flex items-center transition"><Download className="w-4 h-4" /></a>
                        ) : ( <span className="text-xs text-red-500">No Link</span> )}`
);

// Replace SOP link (Buka Drive)
content = content.replace(
  /\{doc\.url_dokumen \? \( <a href=\{doc\.url_dokumen\} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded inline-flex items-center transition font-semibold"><LinkIcon className="w-4 h-4 mr-2" \/> Buka Drive<\/a>\n\s*\) : \( <span className="text-xs text-red-500">No Link<\/span> \)\}/,
  `{doc.url_dokumen ? ( <a href={getGDrivePreviewUrl(doc.url_dokumen)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded inline-flex items-center transition font-semibold"><LinkIcon className="w-4 h-4 mr-2" /> Buka Drive</a>
                      ) : ( <span className="text-xs text-red-500">No Link</span> )}`
);

console.log('Done. Checking...');
console.log('getGDrivePreviewUrl in Dokumen:', content.includes('getGDrivePreviewUrl(doc.url_dokumen)'));

fs.writeFileSync('src/app/page.js', content, 'utf8');
