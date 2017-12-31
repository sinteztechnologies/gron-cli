# GRON Digital Command-line Tools

## Introduction and pre-requisites

Supplies a CLI for the GRON Digital smart contracts. The CLI has been implemented using the Node platform. 

Required Node version 8+.

In order to use the CLI, the [GRON smart contracts](https://github.com/grondigital/smartcontracts-truffle) need to be compiled and deployed to a blockchain network. 

## Setup

Build and compile the smart contracts:

```shell
# in one shell / tab, start testrpc 

testrpc # take note of generated accounts and private keys

# in a separate tab 
git clone https://github.com/grondigital/smartcontracts-truffle
cd smartcontracts-truffle
truffle compile 
# deploys to testrpc - take note of GRO and GROVesting addresses
# GRON development conventions - see migration files for details:
# testrpc accounts[0] = fundingWallet
# testrpc accounts[1] = controlWallet

truffle migrate 
# contracts deployed. Take note of GRO and GROVesting addresses in output

```
Set the following environment variables:

```shell 
# These parameters are deployment specific
 export GRON_PROVIDER='http://localhost:8545' # Note that Test-RPC only supplies and HTTP interface
 export GRON_TOKEN_INTERFACE='/path/to/smartcontracts-truffle/build/contracts/GRO.json' # Truffle compiled GRO contract (contains ABI)
 export GRON_VESTING_INTERFACE='/path/to/smartcontracts-truffle/build/contracts/GROVesting.json' # Truffle compiled GROVesting contract (contains ABI)
 export GRON_TOKEN_ADDRESS='0x... # Address of the deployed GRO Token contract
 export GRON_VESTING_ADDRESS='0x... # Address of the deployed GROVesting contract
 export GRON_FUND_WALLET_ADDRESS='0x...'
 export GRON_FUND_WALLET_KEY='...'
 export GRON_CONTROL_WALLET_ADDRESS='0x...'
 export GRON_CONTROL_WALLET_KEY='...'
 
 ```
Install the CLI tools
```shell
git clone https://github.com/grondigital/gron-cli
cd gron-cli
npm install # install dependencies
npm link # create system wide gron command
```

## Usage

```shell
gron -h # show commands and options
```

