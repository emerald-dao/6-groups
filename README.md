# 💎 Emerald Academy

## 🚩 Challenge 6: Groups

🎫 Deploy a subcommunities contract to learn the basics of voting inside of a DAO on the Flow blockchain and Cadence. You'll use:
- The local Flow emulator to deploy smart contracts. 
- The local Flow dev wallet to log into test accounts.
- A template Next.js app with sample scripts and transactions to interact with your contract.

🌟 The final deliverable is a DApp that allows users to create Groups, join & leave them, discover Groups, and chat inside of them.

💬 Meet other builders working on this challenge and get help in the [Emerald City Discord](https://discord.gg/emeraldcity)!

---

# 📦 Checkpoint 0: Install

Required: 
* [Git](https://git-scm.com/downloads)
* [Node](https://nodejs.org/dist/latest-v16.x/)  (🧨 Use Node v16 or a previous version as v17 may cause errors 🧨). You know you have installed it if you type `node -v` in your terminal and it prints a version.
* [Flow CLI](https://docs.onflow.org/flow-cli/install/)  (🧨 Make sure to install the correct link for your system 🧨). You know you have installed it if you type `flow version` in your terminal and it prints a version.

```sh
git clone https://github.com/emerald-dao/6-groups.git
```

> in a terminal window, 📱 install the dependencies start your frontend:

```sh
cd 6-groups
npm install
npm run dev
```

> in a second terminal window, start your 👷‍ local emulator:

```bash
cd 6-groups
flow emulator start -v
```

*Note: the `-v` flag means to print transaction and script output to your local emulator*

> in a third terminal window, 💾 deploy your contract and 💸 start your local wallet:

```bash
cd 6-groups
flow project deploy
flow dev-wallet
```

> You can `flow project deploy --update` to deploy a new contract any time.

📱 Open http://localhost:3000 to see the app

---

# 👛 Checkpoint 1: Wallets

We'll be using **the local Flow dev wallet**.

> Click the "Log In" button and notice a window appears with different accounts to select, each with their own Flow Token balance. Select the first account to log in to it.

---

# 🔖 Checkpoint 2: Viewing a Group

After logging in to our DApp, you will notice that there is already a community up and running: Emerald City!

<img src="https://i.imgur.com/gWlGUwh.png" alt="emerald city group" width="400" />

> Click on Emerald City

You will be taken to a page that shows all the details of Emerald City:

<img src="https://i.imgur.com/BIuoZPm.png" alt="group page" width="400" />

Because you are logged in to the Service Account, and that account is the owner of this group, you are in the community already. Let's try to log into a different account and join this community.

# 👪 Checkpoint 3: Joining a Group

Let's join the Emerald City group from a different account!

> At the top, click "Logout" and log back in with Account A

Account A does not belong to this group, so we cannot do thing like see the group's forum. 

> To join, click the "Join Community" button and you will see a transaction model pop up:

<img src="https://i.imgur.com/rFUkEKX.png" alt="join group" width="400" />

If you click "Approve", you will notice that your address is now added to the members list. Woohoo! We successfully joined the group. If you wanted to, you could also leave the group.

# 📑 Checkpoint 4: Type a Message

Now that we joined the group, we can start to use the forum!

> Type a message into the community forum and click "Submit". You will notice a transaction popup, click Approve.

<img src="https://i.imgur.com/OKkFToc.png" alt="join group" width="400" />

Your message has been added to the community forum, stored completely on-chain!

---

# 👀 Checkpoint 5: Creating a Group

To create a group, head back to the main page and click "Create Group". Once you are there, you must fill in:
- An image for your group
- The name of your group
- A description for your group

You will be able to preview your new group on the right-hand side:

<img src="https://i.imgur.com/yvZCW6P.png" alt="preview group" width="400" />

> Click "Create Group" to run a transaction that will create the new group on-chain

A popup will appear to create your new proposal. This is a transaction that will change data on the blockchain. Specifically, it is creating a new `Group` resource and storing it in your collection of Groups that you have created.

> To see how this transaction was run, check out the `createGroup` function inside of `./pages/create.js`

> For more on Cadence & Resources, you can look at the contract code in `./flow/cadence/Groups.cdc` or check out our <a href="https://github.com/emerald-dao/beginner-cadence-course">Beginner Cadence Course</a>

After clicking "Approve", you will be taken back to the main dashboard. You should now see your group:

<img src="" alt="see your new group" width="400" />

---

# 💸 Checkpoint 6: Obtaining Tokens

In order to obtain some tokens, let's actually mint some to our account.

> In a new terminal window, run `npm run mint 0xf8d6e0586b0a20c7 30.0`

This will mint 30.0 tokens to the account with address 0xf8d6e0586b0a20c7.

If you go back to your application and refresh the page (making sure you are logged in with account 0xf8d6e0586b0a20c7), you will notice your balance update at the top:

<img src="https://i.imgur.com/zH4fgxP.png" alt="balance update" width="400" />

> To see how this command minted tokens to our account, check out `./actions/mint_tokens.js`

---

# 📤 Checkpoint 7: Voting

You can click to vote a certain way by clicking one of either "For", "Against", or "Abstain".

> Click one of the voting options and see the transaction popup appear:

<img src="https://i.imgur.com/AOjf5wx.png" alt="tx to vote" width="400" />

If you click approve, you should see the vote tally change, and your address get added to the list of voters below. Remember, you can't vote again!

---

# 📘 Checkpoint 8: Vote with a Different Account

Let's try to submit a vote from another account!

1. At the top, click "Logout" and log in with a different account than before.
2. Join the DAO
3. Mint tokens to the new account using the same command as in Checkpoint 6, making sure to change the address to the new account.
4. Click on the same proposal and vote once again.
5. Watch the tally change!

# 💾 Checkpoint 9: Deploy it to testnet!

📔 Ready to deploy to a public testnet?!?

> 🔐 Generate a **deployer address** by typing `flow keys generate --network=testnet` into a terminal. Make sure to save your public key and private key somewhere, you will need them soon.

<img src="https://i.imgur.com/jU9sRiL.png" alt="generate key pair" />

> 👛 Create your **deployer account** by going to https://testnet-faucet.onflow.org/, pasting in your public key from above, and clicking `CREATE ACCOUNT`: 

<img src="https://i.imgur.com/OitvEoO.png" alt="configure testnet account on the website" width="400" />

> After it finishes, click `COPY ADDRESS` and make sure to save that address somewhere. You will need it!

> ⛽️ Add your new testnet account to your `flow.json` by modifying the following lines of code. Paste your address you copied above to where it says "YOUR GENERATED ADDRESS", and paste your private key where it says "YOUR PRIVATE KEY".

```json
"accounts": {
  "emulator-account": {
    "address": "f8d6e0586b0a20c7",
    "key": "5112883de06b9576af62b9aafa7ead685fb7fb46c495039b1a83649d61bff97c"
  },
  "testnet-account": {
    "address": "YOUR GENERATED ADDRESS",
    "key": {
      "type": "hex",
      "index": 0,
      "signatureAlgorithm": "ECDSA_P256",
      "hashAlgorithm": "SHA3_256",
      "privateKey": "YOUR PRIVATE KEY"
    }
  }
},
"deployments": {
  "emulator": {
    "emulator-account": [
      "ExampleToken",
      "Vote"
    ]
  },
  "testnet": {
    "testnet-account": [
      "ExampleToken",
      "Vote"
    ]
  }
}
```

> 🚀 Deploy your Vote smart contract:

```sh
flow project deploy --network=testnet
```

<img src="https://i.imgur.com/nsASuV3.png" alt="deploy contract to testnet" />

> Lastly, configure your .env file to point to Flow TestNet so we can interact with your new contract.

In your .env file, change the following:
1. `NEXT_PUBLIC_CONTRACT_ADDRESS` to your generated testnet address
2. `NEXT_PUBLIC_STANDARD_ADDRESS` to `0x9a0766d93b6608b7`
3. `PRIVATE_KEY` to your private key
4. `NEXT_PUBLIC_ACCESS_NODE` to `https://rest-testnet.onflow.org`
5. `NEXT_PUBLIC_WALLET` to `https://fcl-discovery.onflow.org/testnet/authn` 

You can now terminate all your terminals since we no longer need to run our own local blockchain or wallet. Everything lives on testnet!

Let's try out our application on testnet:

1. Run `npm run dev` to start your application in a terminal.
2. On http://localhost:3000/, click "connect" and log in to your Blocto or Lilico wallet, making sure to copy the address you log in with.
3. Join the DAO and run the transaction. Wait ~30 seconds and then refresh the page. You should now be in the DAO.
4. Create a new proposal, same as before.
5. To obtain tokens, run `npm run mint [THE ADDRESS YOU COPIED IN STEP 2] [AMOUNT OF TOKENS]` like we did in Checkpoint 6.
6. In your terminal, you should see a printed "Transaction Id". If you go to [Testnet Flowscan](https://testnet.flowscan.org/) and paste in that Transaction Id, you should see information about that minting transaction.
7. Attempt to vote in your proposal.

---

# 📝 Make Edits!

🔏 You can also check out your token smart contract `ExampleToken.cdc` in `flow/cadence/ExampleToken.cdc`, or your voting/DAO smart contract `Vote.cdc` in `flow/cadence/Vote.cdc`

💼 Take a quick look at how your contract get deployed in `flow.json`.

📝 If you want to make frontend edits, open `index.js` in `pages/index.js`.

# ⚔️ Side Quests

> 🏃 More challenges coming soon...

> 💬 Meet other builders working on this challenge and get help in the [💎 Emerald City Discord](https://discord.gg/emeraldcity)!

> 👉 Problems, questions, comments on the stack? Post them to the [💎 Emerald City Discord](https://discord.gg/emeraldcity).
