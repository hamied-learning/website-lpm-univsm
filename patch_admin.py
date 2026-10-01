import re

with open('src/app/admin/page.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Revert Dokumen back to original (remove SOP from Kategori)
content = content.replace("options: ['Penetapan', 'Pelaksanaan', 'Evaluasi', 'Pengendalian', 'Peningkatan', 'SOP']", "options: ['Penetapan', 'Pelaksanaan', 'Evaluasi', 'Pengendalian', 'Peningkatan']")
content = content.replace("label: 'Kategori (PPEPP / SOP)'", "label: 'Kategori (PPEPP)'")

# 2. Add SOP to tabConfig (insert after Dokumen)
sop_config = """  SOP: { 
    type: 'multi',
    icon: <FileText className="w-5 h-5 mr-3 text-purple-400" />,
    fields: [
      { name: 'tingkat', label: 'Tingkat SOP', type: 'select', options: ['SOP Tingkat Universitas', 'SOP Tingkat Fakultas'] },
      { name: 'jenis_sop', label: 'Jenis SOP' },
      { name: 'url_dokumen', label: 'Link URL Dokumen / Google Drive' }
    ] 
  },
"""
content = re.sub(r"(  Dokumen: \{.*?\] \n  \},)\n", r"\1\n" + sop_config, content, flags=re.DOTALL)

with open('src/app/admin/page.js', 'w', encoding='utf-8') as f:
    f.write(content)
