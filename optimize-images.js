const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = './assets';
const outputDir = './assets/webp';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

fs.readdir(imagesDir, async (err, files) => {
    if (err) throw err;

    await Promise.all(files.map(file => {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
            return sharp(path.join(imagesDir, file))
                .toFile(path.join(outputDir, `${path.basename(file, ext)}.webp`), { quality: 80 })
                .then(info => console.log(`Converted ${file} to WebP format. Size: ${info.size} bytes`))
                .catch(err => console.error(`Error processing ${file}:`, err));
        }
    }));
});
