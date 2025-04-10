const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './assets/';
const outputDir = './assets/optimized/';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// Function to optimize images
const optimizeImages = async () => {
    const files = fs.readdirSync(inputDir);
    for (const file of files) {
        const ext = path.extname(file).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            await sharp(path.join(inputDir, file))
                .resize(800) // Resize to a maximum width of 800px
                .toFile(path.join(outputDir, file));
            console.log(`Optimized ${file}`);
        }
    }
};

optimizeImages().catch(err => console.error(err));
