#!/usr/bin/env node
const program = require('commander')
let package = require('../../package.json')
program
  .version(package.version)
  .command('init')
  .description('begin init')
  .alias('i')
  .action(()=> {
    require('../commands/init')
  });

program.parse(process.argv);