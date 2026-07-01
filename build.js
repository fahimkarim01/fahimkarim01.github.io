const { execSync } = require('child_process');
const fs = require('fs');

try {
  console.log('Running build...');
  const output = execSync('npm.cmd run build', { encoding: 'utf-8' });
  fs.writeFileSync('build.log', output);
  console.log('Build succeeded');
} catch (error) {
  fs.writeFileSync('build.log', error.stdout + '\n' + error.stderr);
  console.log('Build failed. See build.log');
}
