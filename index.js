const core = require('@actions/core');
const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;

async function determineDistribCodename() {
	let distribCodename = "";
	const options = {};
	options.listeners = {
		stdout: (data) => {
			distribCodename += data.toString();
		},
	};
	await exec.exec(
		"bash",
		["-c", 'source /etc/lsb-release ; echo -n "$DISTRIB_CODENAME"'],
		options
	);
	return distribCodename;
}

async function run() {
    const distro = core.getInput('ros-distro');
    let dependencies = ['python3-bloom', 'python3-stdeb', 'dh-make']
    
    const distribCodename = await determineDistribCodename();

    if (distribCodename === 'bionic' || distribCodename === 'xenial') {
        dependencies = dependencies.map(pkg => pkg.replace('python3', 'python'));
    }
    await exec.exec(
        'sudo',
        ['apt', 'install', '-y'].concat(dependencies)
    );
    await exec.exec(
        'sudo',
        ['bash', '-c', `source /opt/ros/${distro}/setup.bash && ${__dirname}/release`]
    );

    console.log(`Checking ${path.resolve(__dirname, 'target')} for binaries`)
	
    const filenames = (await fsPromises.readdir(path.resolve(__dirname, 'target')))
        .filter(f => f.endsWith('.deb'))
        .map(f => path.resolve(__dirname, 'target', f))
	
    console.log(`Binaries: ${filenames}`);
    core.setOutput('files', filenames);
}

run();
