#!/usr/bin/env node
const program = require('commander')
let package = require('../../package.json');
const { action } = require('commander');


program
  .version(package.version)
  .command('init')
  .description('begin init')
  .alias('i')
  .action(()=> {
    require('../commands/init')
  });

program
  .version(package.version)
  .command('add')
  .description('add plugin')
  .alias('a')
  .action(()=>{
    require('../commands/add')
  })

program.parse(process.argv);