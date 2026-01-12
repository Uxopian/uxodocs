
import fs from 'fs';
import path from 'path';

const BUILD_DIR = path.resolve('build/pdfs');

async function organizePdfs() {
    if (!fs.existsSync(BUILD_DIR)) {
        return;
    }


    const files = fs.readdirSync(BUILD_DIR, { recursive: true });

    for (const relativePath of files) {
        const fullPath = path.join(BUILD_DIR, relativePath);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) continue;
        if (!fullPath.endsWith('.pdf')) continue;

        const filename = path.basename(fullPath);

        if (filename.includes('.title.pdf') || filename.includes('.content.pdf') || filename.includes('.raw.pdf')) {
            continue;
        }
        if (path.dirname(fullPath) === BUILD_DIR) {
            continue;
        }

        const targetPath = path.join(BUILD_DIR, filename);

        fs.renameSync(fullPath, targetPath);
    }

    console.log('PDFs organized successfully.');
}

organizePdfs();
