#!/bin/bash
source ~/.nvm/nvm.sh
nvm use 7.9.0
git pull origin master
npm run build
pm2 restart id
pm2 logs id