const archiver = require('archiver');
const fs = require("fs");
const path = require("path");

const DIST_APPS_FOLDER = "./dist/apps";
const ZIP_OUTPUT_FOLDERS = "./dist/zips";

const dirs = fs.readdirSync(DIST_APPS_FOLDER);

for (const appDir of dirs) {
    const appPath = path.join(DIST_APPS_FOLDER, appDir);
    const output = fs.createWriteStream(path.join(ZIP_OUTPUT_FOLDERS, `${appDir}.zip`));
    
    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });
    archive.pipe(output);
    archive.directory(appPath, false);
    archive.finalize();
}
