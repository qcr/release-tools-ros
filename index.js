const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
    console.log(__dirname)
    await exec.exec(
	 	"bash",
	 	["-c", `sudo ln -s ${__dirname}/release /usr/bin/release`]
	);
}

run();
