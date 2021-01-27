const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    await exec.exec(
		"bash",
		["-c", 'ls -la']
	);
    await exec.exec(
		"bash",
		["-c", './release']
	);
}

run();