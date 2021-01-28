const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    console.log(__dirname)
    await exec.exec(
	 	"bash",
	 	["-c", `sudo ${__dirname}/release`]
	);
}

run();
