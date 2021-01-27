# ARM64 Build Tools

## Setup
Clone the repository
```sh
https://github.com/qcr/arm64-release-tools.git
```

Navigate to the root directory of the release tools
```sh
cd arm64-release-tools
```

Symlink your ROS workspace src directory into the root directory of the build tools, for example:

```sh
ln -s $HOME/catkin_ws/src src
```

## Usage
Run the release tool to create the debian binaries

```
sudo ./release
```

Push the created debians to the remote repository

```
./push
```

*Note:* Please speak to Gavin Suddrey <g.suddrey@qut.edu.au> to get write access to the remote repository

