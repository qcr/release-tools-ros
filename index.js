const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    console.log(__dirname)
    await exec.exec(
	 	"bash",
	 	["-c", `ln ${__dirname}/release /usr/bin/release`]
	);
}

run();
