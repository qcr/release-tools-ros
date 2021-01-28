const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    const distro = core.getInput('ros-distro');
    const dependencies = ['python3-bloom', 'python3-stdeb', 'dh-make']

    await exec.exec(
		'sudo',
		['apt', 'install', '-y'] + dependencies
    await exec.exec(
	 	'sudo',
	 	['bash', '-c', `source /opt/ros/${distro}/setup.bash && ${__dirname}/release`]
	);
}

run();
