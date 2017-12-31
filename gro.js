#!/usr/bin/env node

const program = require('commander');

const { allocateTokens } = require('./functions');

program
    .version('0.0.1')
    .description('GRON Digital Command-line Tools')

program
    .command('allocateTokens <participantAddress> <amountTokens>')
    .alias('a')
    .description('Allocate GRO tokens to participant')
    .action((participantAddress, amountTokens) => {
	allocateTokens(participantAddress, amountTokens);
    });


program
    .command('tokenBalance <participantAddress>')
    .alias('b')
    .description('View number of GRO tokens to allocated participant')
    .action((participantAddress) => {
	tokenBalance(participantAddress);
    });

program
    .command('totalSupply')
    .alias('s')
    .description('View total supply of GRO tokens')
    .action(() => {
	totalSupply();
    });

program.parse(process.argv);
