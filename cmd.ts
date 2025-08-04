#!/usr/bin/env node

import {Command} from "Commander";
import {Add,Show,Execute,Delete,DeleteAll} from './add.js'
const Program=new Command();
Program
  .name('OpenApp')
  .description('Automated Script To Open Application')
  .version('0.8.0');


  //Program To Add Path->
Program.command('add')
  .description('Open Any Application Just Through CLI')
  .argument("<alias>", "Enter the application name")
  .argument("<path>", "Enter the full path to the application")
  .action((alias, path) => {
    console.log(`🚀 Received alias: ${alias}`);
    console.log(`📂 Received path: ${path}`);
    Add(alias, path); // <-- pass them to your Add() function
  });
    //Program to show cli apps
  Program.command('list')
  .description('open list of given application')
  .action(()=>{
    Show()
  })

  Program.command('run')
  .description('This run the appliactoin')
  .argument('<alias>','Enter the application name')
  .action((alias)=>{
   Execute(alias)
  })

  Program.command('remove')
  .description('Delete application')
  .argument('<alias>',"enter the application name")
  .action((alias)=>{
    Delete(alias)
  })

  
Program.command('remove-all')
  .description('Delete all saved app aliases')
  .option('--force', 'Force delete without confirmation')
  .action((options) => {
    DeleteAll(options.force);
  });

  Program.parse()
