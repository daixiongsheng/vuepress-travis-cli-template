#! /bin/zsh
git add .
date=$(date "+%Y-%m-%d-%H:%M:%S")
git commit -m "$date"
git push