const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

const DIST_APPS_FOLDER = './dist/apps';
const LIBS_DB_SRC_FOLDER = './libs/db/src';
const ZIP_OUTPUT_FOLDERS = './dist/zips';

const prepare = () => {
  fs.mkdirSync("./dist/zips");
}


const setupBackendZip = () => {
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });
  archive.pipe(
    fs.createWriteStream(path.join(ZIP_OUTPUT_FOLDERS, `backend.zip`))
  );

  // Add files to archive
  archive.directory('./dist/apps/backend', false);
  archive.file('./libs/db/src/schema.prisma', { name: 'schema.prisma' });
  archive.file(
    './node_modules/.prisma/client/libquery_engine-rhel-openssl-1.0.x.so.node',
    { name: 'libquery_engine-rhel-openssl-1.0.x.so.node' }
  );

  archive.finalize();
};


prepare();
setupBackendZip();
