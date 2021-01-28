const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    const distro = core.getInput('ros-distro');
    await exec.exec(
	 	'sudo',
	 	['bash', '-c', `source /opt/ros/${distro}/setup.bash && ${__dirname}/release`]
	);
}

run();
