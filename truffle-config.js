const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");

let mnemonic;
let appID;

try {
  mnemonic = fs.readFileSync(".secret").toString().trim();
  appID = fs.readFileSync(".appID").toString().trim();
} catch {
  mnemonic = "";
  appID = "";
}

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    matic: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rpc-mumbai.maticvigil.com/v1/${appID}`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.9", // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
};
