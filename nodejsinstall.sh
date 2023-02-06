#!/bin/bash
version=18.x
if [ $# -ge 1 ]
then
    echo aaa
fi

curl http://deb.nodesource.com/setup_$version | sudo bash
sudo apt install nodejs
