#!/usr/bin/env node
import { Command } from "Commander";
import Add from './add.js';
const Program = new Command();
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
Program.parse();
