const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

if (!content.includes("case 'sop':\n        if (dataSop.length === 0)")) {
  content = content.replace(/case 'dokumen':\s*if \(documents\.length === 0\) fetchWithCache\('dokumen', setDocuments, true\);\s*break;/,
    "case 'dokumen':\n        if (documents.length === 0) fetchWithCache('dokumen', setDocuments, true);\n        break;\n      case 'sop':\n        if (dataSop.length === 0) fetchWithCache('sop', setDataSop, true);\n        break;");
}

fs.writeFileSync('src/app/page.js', content, 'utf8');
