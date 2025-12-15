
import fs from 'fs';
import path from 'path';

const BUILD_DIR = path.resolve('build/pdfs');

async function organizePdfs() {
    if (!fs.existsSync(BUILD_DIR)) {
        console.log('No PDF directory found at', BUILD_DIR);
        return;
    }

    console.log('Organizing PDFs in', BUILD_DIR);

    // Find all PDF files recursively (Node 20+)
    const files = fs.readdirSync(BUILD_DIR, { recursive: true });

    for (const relativePath of files) {
        const fullPath = path.join(BUILD_DIR, relativePath);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) continue;
        if (!fullPath.endsWith('.pdf')) continue;

        const filename = path.basename(fullPath);

        // Skip intermediate files
        if (filename.includes('.title.pdf') || filename.includes('.content.pdf') || filename.includes('.raw.pdf')) {
            continue;
        }

        // Skip files already at root
        if (path.dirname(fullPath) === BUILD_DIR) {
            continue;
        }

        const targetPath = path.join(BUILD_DIR, filename);

        console.log(`Moving ${filename} to root...`);
        fs.renameSync(fullPath, targetPath);
    }

    // Cleanup empty directories (optional but good)
    // Simple pass to remove empty dirs - can receive ENOTEMPTY if not empty, ignore error
    // Not strictly necessary for functionality.

    console.log('PDFs organized successfully.');
}

organizePdfs();
