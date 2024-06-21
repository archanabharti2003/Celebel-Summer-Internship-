const fs = require('fs').promises;

function readFilePromise(filePath) {
  return fs.readFile(filePath, 'utf8');
}

function writeFilePromise(filePath, content) {
  return fs.writeFile(filePath, content, 'utf8');
}

async function readAndWriteFiles() {
  try {
    const data = await readFilePromise('input.txt');
    console.log('File content:', data);
    await writeFilePromise('output.txt', data);
    console.log('File written successfully');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Usage
readAndWriteFiles();