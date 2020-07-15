#!/usr/bin/env node
const program = require('commander')

program
  .version('0.0.1')
  .command('init')
  .action(function(dir, otherDirs) {
    console.log('rmdir %s', dir);
    if (otherDirs) {
      otherDirs.forEach(function(oDir) {
        console.log('rmdir %s', oDir);
      });
    }
  });

program.parse(process.argv);