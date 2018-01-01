// requires
var Web3 = require('web3');
var contract = require("truffle-contract");
// config
var provider = process.env.GRON_PROVIDER; 
var groInterface = require(process.env.GRON_TOKEN_INTERFACE);
var vestingInterface = require(process.env.GRON_VESTING_INTERFACE);
var groContractAddress = process.env.GRON_TOKEN_ADDRESS; 
var vestingAddress = process.env.GRON_VESTING_ADDRESS;

var fundingWallet = process.env.GRON_FUND_WALLET_ADDRESS;
var fundingKey = process.env.GRON_FUND_WALLET_KEY;
var controlWallet = process.env.GRON_CONTROL_WALLET_ADDRESS;
var controlKey = process.env.GRON_CONTROL_WALLET_KEY;
// TODO: double check this value
var gasLimit = 3000000;
// end config

var web3 = new Web3(Web3.givenProvider || provider);
var contract = new web3.eth.Contract(groInterface.abi, groContractAddress);

allocateTokens = function(participant, amountTokens) {

    var address = participant;
    var tokens = amountTokens;

    contract.methods.setVestingContract(vestingAddress)
	.send({from: fundingWallet}, function(error, result) {
	    if(error){
		console.log("setVestingContract failed");
		console.log(error);
	    }
	    else{
		contract.methods.verifyParticipant(participant.participantAddress)
		    .send({from: fundingWallet}, function(error, result) {
			if(error) {
			    console.log("verifyParticipant failed");
			    console.log(error);
			}
			else{
			    contract.methods.allocatePresaleTokens(address, tokens)
				.send({from: fundingWallet, gas: gasLimit}, function(error, result) {
				    if(error) {
					console.log("allocatePresaleTokens failed");
					console.log(error);
				    }
				});	 	
			}});
	    }});	
};

tokenBalance = function(address) {

    contract.methods.balanceOf(address)
	.call({from: fundingWallet}, function(error, result) {
	    if(error) {
		console.log("balanceOf failed");
		console.log(error);
	    }
	    else{
		console.log("GRO " + result);
	    }
	});
}

totalSupply = function() {

    contract.methods.totalSupply()
	.call({from: fundingWallet}, function(error, result) {
	    if(error) {
		console.log("totalSupply failed");
		console.log(error);
	    }
	    else{
		console.log("GRO " + result);
	    }
	});
}


addLiquidity = function(etherAmount) {

    let wei = web3.utils.toWei(etherAmount, "ether");
    contract.methods.addLiquidity()
	.send({from: fundingWallet, value: wei}, function(error, result) {
	    if(error) {
		console.log("addLiquidity failed");
		console.log(error);
	    }
	    else{
		console.log(etherAmount + " ETH added.");
	    }
	});
}


removeLiquidity = function(etherAmount) {

    contract.methods.removeLiquidity(etherAmount)
	.send({from: fundingWallet}, function(error, result) {
	    if(error) {
		console.log("removeLiquidity failed");
		console.log(error);
	    }
	    else{
		console.log(etherAmount + " ETH transferred.");
	    }
	});
}



// Export all methods
module.exports = { allocateTokens, totalSupply, tokenBalance, addLiquidity, removeLiquidity};

