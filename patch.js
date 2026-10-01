const fs = require('fs');
let content = fs.readFileSync('src/app/page.js', 'utf8');

// 1. Add dataSop state
content = content.replace('const [documents, setDocuments] = useState([]);', 
  'const [documents, setDocuments] = useState([]);\n  const [dataSop, setDataSop] = useState([]);');

// 2. Add navLinksStart sop
content = content.replace('{ id: \'dokumen\', name: \'Dokumen Mutu\' },',
  '{ id: \'dokumen\', name: \'Dokumen Mutu\' },\n      { id: \'sop\', name: \'SOP\' },');

// 3. Revert categories in DokumenPage
content = content.replace('const categories = [\'Semua\', \'Penetapan\', \'Pelaksanaan\', \'Evaluasi\', \'Pengendalian\', \'Peningkatan\', \'SOP\'];',
  'const categories = [\'Semua\', \'Penetapan\', \'Pelaksanaan\', \'Evaluasi\', \'Pengendalian\', \'Peningkatan\'];');

// 4. Add fetch cache for sop
content = content.replace('case \'dokumen\':\n        if (documents.length === 0) fetchWithCache(\'dokumen\', setDocuments, true);\n        break;',
  'case \'dokumen\':\n        if (documents.length === 0) fetchWithCache(\'dokumen\', setDocuments, true);\n        break;\n      case \'sop\':\n        if (dataSop.length === 0) fetchWithCache(\'sop\', setDataSop, true);\n        break;');

// 5. Create SopPage component (insert before PeraturanPage)
const sopComponent = `
  const SopPage = () => {
    const univSops = dataSop.filter(s => s.tingkat === 'SOP Tingkat Universitas');
    const fakSops = dataSop.filter(s => s.tingkat === 'SOP Tingkat Fakultas');

    const renderTable = (title, data) => (
      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-blue-600 pl-3">{title}</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200 text-gray-700 text-sm uppercase tracking-wider">
                  <th className="p-4 font-semibold w-16 text-center">No</th>
                  <th className="p-4 font-semibold">Jenis SOP</th>
                  <th className="p-4 font-semibold text-center">Link Drive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading && data.length === 0 ? (
                  <tr><td colSpan="3" className="p-8 text-center text-gray-500"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2"/> Memuat data...</td></tr>
                ) : data.length > 0 ? data.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-blue-50 transition duration-150">
                    <td className="p-4 text-center font-medium text-gray-600">{idx + 1}</td>
                    <td className="p-4 font-medium text-gray-800 flex items-center"><FileText className="w-5 h-5 text-blue-500 mr-3 shrink-0" /> {doc.jenis_sop}</td>
                    <td className="p-4 text-center">
                      {doc.url_dokumen ? ( <a href={doc.url_dokumen} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded inline-flex items-center transition font-semibold"><LinkIcon className="w-4 h-4 mr-2" /> Buka Drive</a>
                      ) : ( <span className="text-xs text-red-500">No Link</span> )}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="p-8 text-center text-gray-500">Belum ada data SOP.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

    return (
      <div className="py-16 bg-gray-50 min-h-[70vh] animate-in fade-in">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900">Standar Operasional Prosedur (SOP)</h1>
            <p className="text-gray-600 mt-2">Akses kumpulan SOP tingkat Universitas dan Fakultas.</p>
          </div>
          {renderTable('A. SOP Tingkat Universitas', univSops)}
          {renderTable('B. SOP Tingkat Fakultas', fakSops)}
        </div>
      </div>
    );
  };

`;
content = content.replace('const PeraturanPage = () => (', sopComponent + '  const PeraturanPage = () => (');

// 6. Add case 'sop' to renderContent
content = content.replace('case \'dokumen\': return <DokumenPage />;', 'case \'dokumen\': return <DokumenPage />;\n      case \'sop\': return <SopPage />;');

fs.writeFileSync('src/app/page.js', content, 'utf8');
