rm -r build
npm ci
npm run elasticbean-build
cd build
zip -r build.zip .
mv build.zip ../