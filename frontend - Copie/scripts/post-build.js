const fs = require('fs');
const path = require('path');

/**
 * Script pour copier les fichiers statiques après le build standalone
 * Ce script est nécessaire car Next.js en mode standalone ne copie pas automatiquement:
 * - Le dossier public/
 * - Le dossier .next/static/
 */

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }

  const files = fs.readdirSync(from);

  files.forEach(file => {
    const fromPath = path.join(from, file);
    const toPath = path.join(to, file);

    const stat = fs.statSync(fromPath);

    if (stat.isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

console.log('📂 Copying public folder to standalone...');
const publicSource = path.join(__dirname, '..', 'public');
const publicDest = path.join(__dirname, '..', '.next', 'standalone', 'public');
copyFolderSync(publicSource, publicDest);
console.log('✅ Public folder copied successfully!');

console.log('📂 Copying static folder to standalone...');
const staticSource = path.join(__dirname, '..', '.next', 'static');
const staticDest = path.join(__dirname, '..', '.next', 'standalone', '.next', 'static');
copyFolderSync(staticSource, staticDest);
console.log('✅ Static folder copied successfully!');

console.log('🎉 Post-build process completed!');
