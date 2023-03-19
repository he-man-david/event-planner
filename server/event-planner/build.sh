rm -r build
npm ci
npm run build
zip -r build.zip ./build
