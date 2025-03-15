const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = './assets';
const outputDir = './assets/webp';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

fs.readdir(imagesDir, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            sharp(path.join(imagesDir, file))
                .toFile(path.join(outputDir, `${path.basename(file, ext)}.webp`), (err, info) => {
                    if (err) console.error(`Error processing ${file}:`, err);
                    else console.log(`Converted ${file} to WebP format.`);
                });
        }
    });
});
