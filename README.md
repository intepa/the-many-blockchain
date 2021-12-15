# The Many Blockchain
This project is a proof-of-concept blockchain implementation of the Danish property crowdfunding platform [The Many](https://the-many.com/dk). The project comprises of three smart contracts deployed to the [Polygon's](https://polygon.technology/) Mumbai test network and a basic React application for interacting with the smart contracts.

---


## Test out the [live demo](https://the-many-blockchain.dk/) 
1. Make sure to have [Metamask](https://metamask.io/download.html) installed and [connected to the Matic Mumbai-testnet](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/)
2. Create an account and grab some test MATIC from the [Polygon faucet](https://faucet.polygon.technology/)
3. Make sure to [whitelist](https://the-many-blockchain.dk/whitelist) your account (request should only take a few seconds)
   
<img src="https://i.ibb.co/5npfk4j/Screenshot-2021-12-15-at-09-23-52.png" alt="drawing" width="250"/>

<br/>

4. Then [get some TMY tokens](https://the-many-blockchain.dk/contracts) 

<img src="https://i.ibb.co/qphCWqR/Screenshot-2021-12-15-at-09-20-43.png" alt="drawing" width="350"/>

<br/>

### **You are now ready to invest!**
<img src="https://i.ibb.co/ZzFkY5R/Screenshot-2021-12-15-at-09-48-42.png" alt="drawing" width="140"/>

<br/>

5. Go ahead and place your first order in the 'Nordvest' project

<img src="https://i.ibb.co/p1bPrSM/Screenshot-2021-12-15-at-09-31-56.png" alt="drawing" width="350"/>

<br/>

6. Head over to the [Portfolio](https://the-many-blockchain.dk/portfolio) page and click the button to execute the order

<img src="https://i.ibb.co/TWnj9Px/Screenshot-2021-12-15-at-09-34-59.png" alt="drawing"/>

<br/>

### **Congratulations! You are now officially an investor in the project!**

<img src="https://i.ibb.co/ftTdbLk/Screenshot-2021-12-15-at-09-35-32.png" alt="drawing" width="300"/>

-----
## Smart contracts

| Name          | Description                   | Address                             |
| ----------------- | ----------------------------- |------------------------------------ |
| TMY               | The platforms own currency token       |[0x3FC8CeeF43Ecd4575E8A8F31bEf5a4c6Aee40c9f](https://mumbai.polygonscan.com/address/0x3FC8CeeF43Ecd4575E8A8F31bEf5a4c6Aee40c9f)        |
| RegulatorService  | Inspired by the [R-token standard](https://harbor.com/rtokenwhitepaper.pdf) by Harbor this contract enables compliance with KYC/AML requirements        |[0x91D3E99445Cbf73eE2dEa4E647Ddf58ca16fdf9e](https://mumbai.polygonscan.com/address/0x91D3E99445Cbf73eE2dEa4E647Ddf58ca16fdf9e)        |
| Project   | An example of a property investment project contract. This type of contract is deployed with every property investment project offered on the platform.        |[0x2ee85Ad6289BB001b4fea8889A1dc73f64c278ef](https://mumbai.polygonscan.com/address/0x2ee85Ad6289BB001b4fea8889A1dc73f64c278ef)        |

----

## To test out this project in your own local environment:

1)	Clone this repository and run `npm install`
1)  Install [Truffle Ganache](https://trufflesuite.com/ganache/). Start a new workspace and add `truffle-config.js` to the workspace.
2)  Install Truffle `npm install -g truffle`
4)	Run `truffle migrate` to compile and deploy the contracts to your workspace
5)  Open your browser and make sure you have [Metamask](https://metamask.io/download.html) installed
6)  Add Ganache network to Metamask using `http://127.0.0.1:7545` and chain-ID `1337`
7)  Run `npm start` to start the development server
8)  Import some of the accounts from Ganache to Metamask (using their private keys) to interact with the various smart contracts

---

Expected output when running `truffle migrate`

```bash
Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'development'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_contracts.js
==============

   Replacing 'RegulatorService'
   ----------------------------
   > transaction hash:    0x5fa0279829fb54983e56431aa435fa38a74f096ea34055f5ad6e5e2651121887
   > Blocks: 0            Seconds: 0
   > contract address:    0x3124278dd44256B4a1Fc20032aB836D18e58Ef7E
   > block number:        4
   > block timestamp:     1639432451
   > account:             0x9735b5086a6Df6B2587451Cf41d7Fff4B2f1aB59
   > balance:             99.90102908
   > gas used:            530507 (0x8184b)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.01061014 ETH


   Replacing 'TMY'
   ---------------
   > transaction hash:    0x5d5f2084072092a6cdf3943f840ffd86170e821ba3234f718c2c278f5f3c49c3
   > Blocks: 0            Seconds: 0
   > contract address:    0x6866d388B95352290b5FCED3BFd6473E14664C2A
   > block number:        5
   > block timestamp:     1639432453
   > account:             0x9735b5086a6Df6B2587451Cf41d7Fff4B2f1aB59
   > balance:             99.86483648
   > gas used:            1809630 (0x1b9cde)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0361926 ETH


   Replacing 'Project'
   -------------------
   > transaction hash:    0xf5bdfb0ef953266653c981a138f71c8911113de3be074327cadd06028b85738e
   > Blocks: 0            Seconds: 0
   > contract address:    0x36408bA55B188C15862A78094248323136C982D0
   > block number:        6
   > block timestamp:     1639432454
   > account:             0x9735b5086a6Df6B2587451Cf41d7Fff4B2f1aB59
   > balance:             99.82327844
   > gas used:            2077902 (0x1fb4ce)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.04155804 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:          0.08836078 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.08836078 ETH
```

