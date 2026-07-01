const { spawn } = require('child_process');

const child = spawn('npm.cmd', ['run', 'build'], {
  stdio: 'inherit',
  shell: true
});

child.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
