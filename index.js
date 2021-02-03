const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

async function run() {
    const distro = core.getInput('ros-distro');
    const dependencies = ['python3-bloom', 'python3-stdeb', 'dh-make']
    
    await exec.exec(
        'sudo',
        ['apt', 'install', '-y'].concat(dependencies)
    );
    await exec.exec(
        'sudo',
        ['bash', '-c', `source /opt/ros/${distro}/setup.bash && ${__dirname}/release`]
    );
	
    const filenames = (await fsPromises.readdir('./target'))
        .filter(f => f.endsWith('.deb'))
        .map(f => path.resolve(__dirname, 'target', f))
	
    core.setOutput('files', filenames);
}

run();
