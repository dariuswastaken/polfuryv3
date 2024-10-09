const fs = require('fs');
const path = require('path');

const testDir = path.join(__dirname, 'tests');

function runTests() {
  fs.readdir(testDir, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      if (file.endsWith('.js')) {
        require(path.join(testDir, file));
        console.log(`[TEST] ${file} passed!`);
      }
    });
  });
}

runTests();
