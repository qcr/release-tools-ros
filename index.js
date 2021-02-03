const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    const distro = core.getInput('ros-distro');
    const dependencies = ['python3-bloom', 'python3-stdeb', 'dh-make']
    
    let files = '';
	
    const options = {};
    options.listeners = {
        stdout: (data: Buffer) => {
            files += data.toString();
        },
    };
    await exec.exec(
        'sudo',
        'apt', 'install', '-y'].concat(dependencies)
    );
    await exec.exec(
        'sudo',
        ['bash', '-c', `source /opt/ros/${distro}/setup.bash && ${__dirname}/release`], 
        options
   );
	
    core.setOutput('files', filenames);
}

run();
