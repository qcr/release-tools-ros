const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');

const fsPromise = fs.promise;

async function run() {
    const distro = core.getInput('ros-distro');
    const dependencies = ['python3-bloom', 'python3-stdeb', 'dh-make']
    
    await exec.exec(
        'sudo',
        'apt', 'install', '-y'].concat(dependencies)
    );
    await exec.exec(
        'sudo',
        ['bash', '-c', `source /opt/ros/${distro}/setup.bash && ${__dirname}/release`]
    );
	
    const filenames = await fsPromise.readdir('./target').filter(f => f.endsWith('.deb'))
	
    core.setOutput('files', filenames);
    console.log(filenames)
}

run();
