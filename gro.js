#!/usr/bin/env node

const program = require('commander');

const { allocateTokens, totalSupply, tokenBalance, addLiquidity, removeLiquidity  } = require('./functions');

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

program
    .command('addLiquidity <etherAmount>')
    .alias('l')
    .description('Add Ether to GRO token contract.')
    .action((etherAmount) => {
	addLiquidity(etherAmount);
    });

program
    .command('removeLiquidity <etherAmount>')
    .alias('l')
    .description('Allow fundWallet to remove Ether from contract. Ether amount must be an integer.')
    .action((etherAmount) => {
	removeLiquidity(etherAmount);
    });


program.parse(process.argv);
