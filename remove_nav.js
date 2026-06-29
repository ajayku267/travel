const fs = require('fs');
const path = require('path');

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverseDir(fullPath);
    } else if (file === 'page.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      const startTag = '<div className="bg-gray-900 text-white px-6 py-4">';
      if (content.includes(startTag)) {
        const parts = content.split(startTag);
        let firstPart = parts[0];
        let remaining = parts[1];
        let endIdx = remaining.indexOf('</div>\n      </div>');
        if (endIdx !== -1) {
          remaining = remaining.substring(endIdx + 19);
          fs.writeFileSync(fullPath, firstPart + remaining);
          console.log('Updated ' + fullPath);
        }
      }
    }
  }
}

traverseDir('c:/travel/src/app/admin');
