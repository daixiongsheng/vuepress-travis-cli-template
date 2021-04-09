#! /bin/zsh
git add .
date=$(date "+%Y-%m-%d-%H:%M:%S")
git commit -m "$date $1"
git push origin master