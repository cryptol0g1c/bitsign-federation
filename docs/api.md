API
=====

## Status Endpoints
### [Get Bitsign Status [GET /status]](https://bitsign.docs.apiary.io/#reference/0/get-bitsign-status/get-bitsign-status)
This endpoint returns Bitsign blockchain status, latestblock, bootnodes, etc.

## User Endpoints
### [User Info [GET /api/v2/user?email={email}&password={password}]](https://bitsign.docs.apiary.io/#reference/0/user-endpoints/user-info)
This endpoint retrieves token and Ethereum keys needed to interact with the rest of the endpoints.
**Email** and **password** parameters must be provided.

+ Parameters

    + email: alice@crypto.com (string) - Unique email address.
    + password: some_crafty_password (string) - User password.

### [New User [POST /api/v2/user]](https://bitsign.docs.apiary.io/#reference/0/user-endpoints/new-user)
Create new user trough our API to get token access and pre-configured Ethereum keys.
With the token you can query all other endpoints and interact with all blockchains and the Smart Contracts.

+ Attributes
    + email: alice@crypto.com (string) - Unique email address.
    + password: some_crafty_password (string) - User password.
    + username: alice (string) - Unique user name.

+ Request (application/json)

        {
            "email": "",
            "password": "",
            "username": ""
        }

### [Change Password [PUT /api/v2/user]](https://bitsign.docs.apiary.io/#reference/0/user-endpoints/change-password)
This endpoint allows the user to changes their password. You must send the old password and the new one that must respect our security policies.

+ Request (application/json)

        {
            "email": "alice@crypto.com",
            "password": "crafty_password!",
            "newPassword": "new_crafty_password"
        }

## Transaction Endpoints
### [Notarization TX [POST /eth/notarizetx]](https://bitsign.docs.apiary.io/#reference/0/transaction-endpoints/notarization-tx)
This endpoints uses data field input to create a **notary transaction** and include it in a new block.
Transactions from this endpoints will be executed **from Bitsign's main node** to facilitate its creation.
If you want to create your own transaction and send it from your account please use **sendRawTX endpoint instead**.

+ Request (application/json)

        {
            "token": "<your_token>",
            "data": "<some_hexadecimal_data>",
            "address": "<your_ethereum_address>",
            "password": "<your_password>"
        }

### [Get transactions by user [GET /api/v2/transactions?token={token}&hash={hash}]](https://bitsign.docs.apiary.io/#reference/0/transaction-endpoints/get-transactions-by-user)
This endpoint returns the transactions executed by the user. JWT token is a required parameter, but the tx hash is an optional parameter.

+ Parameters

    + token: <user_token> - User token.
    + hash: <hash> (optional) - Transaction hash.

## Raw Transactions Endpoints
### [SendRawTransaction [POST /eth/signedRawTx]](https://bitsign.docs.apiary.io/#reference/0/raw-transactions-endpoints/sendrawtransaction)
If you don't trust or don't want to use the **keypair provided by Bitsign**, you can always call this endpoint that will publish your **offline
signed** raw [transaction](https://web3js.readthedocs.io/en/1.0/web3-eth.html#sendsignedtransaction). Bitsign node will only handle gas cost and transaction publication,
but you have to **craft the entire transaction** on your end.
We will be releasing Bitsign tx library to facilitate this process soon.


+ Request (application/json)

        {
            "token": "",
            "env": "",
            "tx": ""
        }

## Smart Contract Endpoints
### [Deploy new Smart Contract [PUT /eth/contract]](https://bitsign.docs.apiary.io/#reference/0/smart-contract-endpoints/deploy-new-smart-contract)
This endpoint allows the user to deploy a new smart contract. The available smart contracts are:

##### Notarize
This smart contract allows the user to notarize documents.
###### Constructor
In order to initialize Notarize contract the user must send an address, that will be set as the owner of the contract. The owner will be the only one that is able to notarize.
###### Methods
* notarize: This method receive as a parameter a bytes32 that will be the evidence to be notarized. The owner of the contract will be the only one that is capable of execute this method. If the sender is not the owner, the tx will be reverted. After the evidence is notarized the Notary event will be raised with two parameters: the evidence and the address.

##### Escrow
This smart contract allows the user to deposit funds in the smart contract and define a buyer and a seller. Each actor can release the funds to the other part based on pre established conditions. Also there is BSG arbiter which act as an impartial third party that can release the payment to one party in case the other part breaks the initial conditions.
###### Constructor
In order to initialize Escrow contract the user must send _seller (address), _buyer (address) and _endTime (uint). The sender of the transaction will be the arbiter of the contract. The arbiter act as an impartial third party. Also the value should be passed in order to set funds on the contract.
###### Methods
* pay: This method can be executed by the buyer or the arbiter. This method will transfer the balance of the contract to the seller address. After that, it will raise the Payout event with two parameters: balance and seller address.
* refund: This method can be executed by the seller or the arbiter. This method will transfer the balance of the contract to the buyer address. After that, it will raise the Refund event with two parameters: balance and buyer address.
* getBalance: This method will return the balance of the contract. It can be executed by any member of the contract.
* kill: This method can be executed by the arbiter only. It will destruct the contract and send the balance of the contract to its address.

#####  NotarizeTX
###### Constructor
In order to initialize NotarizeTx contract the user must send the following values:
- buyer (address)
- seller (address)
- id  (bytes32)
- date (string)
- value (uint)
- hash (bytes32)
- status (string)
- shipping (string)
###### Methods
* updateStatus: This method can be executed by the buyer or the BSG node. Also it checks that the id passed is the same as one that user sent when deployed. The parameters of this method are status (string), hash (bytes32) and id (bytes32). The main purpose of this method is to update the tx status. After the method notarize the new tx, it raise the NotaryEvt event with the parameters: hash (bytes32) and id (bytes32).
* updateShipping: This method can be executed by the buyer or the BSG node. Also it checks that the id passed is the same as one that user sent when deployed. The parameters of this method are status (string), hash (bytes32) and id (bytes32). The main purpose of this method is to update the tx shipping. After the method notarize the new tx, it raise the NotaryEvt event with the parameters: hash (bytes32) and id (bytes32).

+ Request (application/json)

        {
            "token": "<your_token>",
            "env": "production",
            "args": {
                "_buyer": "",
                "_seller": "",
                "_endTime": 314159
            },
            "type": "Escrow",
            "value": "0",
            "password": "<your_password>"
        }

### [Contract Usage [GET /eth/contract/doc?token={token}&type={type}]](https://bitsign.docs.apiary.io/#reference/0/smart-contract-endpoints/contract-usage)
This endpoint returns smart contract's ABI and functions to use its functionality.

+ Parameters

    + token: <user_token> (string) - User token.
    + type: <contract_name> (string) - Smart Contract type.

### [Call Contract Method [POST /eth/contract]](https://bitsign.docs.apiary.io/#reference/0/smart-contract-endpoints/call-contract-method)

This endpoint allows the user to read the state from the blockchain using contract methods.
This endpoint will not alter blockchain state and therefore wont cost gas.

+ Request (application/json)

        {
            "token": "",
            "address": "",
            "env": "",
            "method": "",
            "args": {}
        }

### [Execute Contract Method[PATCH /eth/contract]](https://bitsign.docs.apiary.io/#reference/0/smart-contract-endpoints/execute-contract-method)

This endpoint allows the user to send a transaction to the node and therefore modify the blockchain state.
Although this method will generally cost gas, there is no limitation about it when using BSG Chain and gas cost will be handled internally.


+ Request (application/json)

        {
            "token": "",
            "address": "<contract_address>",
            "env": "production",
            "method": "pay",
            "args": {

            },
            "password": "<your_password>"
        }

### [Get deployed contracts by user [GET /api/v2/contracts?token={token}]](https://bitsign.docs.apiary.io/#reference/0/smart-contract-endpoints/get-deployed-contracts-by-user)
This endpoint returns the contracts deployed by the user.

+ Parameters

    + token: <user_token> (string) - User token.

## Perform a Crowdsale 

###  [Deploy new Crowdsale Smart Contract [PUT /erc20]](https://bitsign.docs.apiary.io/#reference/0/smart-contract-endpoints/deploy-new-crowdsale-smart-contract)
#### ERC20 Token Crowdsale
This smart contract allows to create a new erc20 crowdsale. By this, user will deploy at same time:
- ERC20 Mintable Token Contract: Simple ERC20 Token example, with mintable token creation. That function allows users with the MinterRole to call the mint() function and mint tokens to users. Minting can also be finished, locking the mint() function's behavior.
- Crowdsale Contract: Allows user allocate tokens to network participants in various ways, mostly in exchange for Ether. Crowdsale have diferent properties:
    - Minted Crowdsale: The Crowdsale mints tokens when a purchase is made.
    - Capped Crowdsale: Adds a cap to your crowdsale, invalidating any purchases that would exceed that cap.
    - Timed Crowdsale:  adds an openingTime and closingTime to user's crowdsale.
##### Constructor
In order to initialize ERC20 crowdsale contract the user must send the following values:
- name (string)            The name of the token.
- symbol (string)          The abreviation of the token.
- decimals (int)           The quantity of decimals which a token can be splitted.
- rate (int)               The rate of the token.
- wallet (address)         The address that will hold the ethers after the ERC20 finish.
- cap (int)                The top quantity of ethers that can be buyed.
- openingTime (date)       The estimated opening time of the erc20 crowdsale. Format HH:mm dd/MM/yyyy.
- closingTime (date)       The estimated closing time of the erc20 crowdsale. Format HH:mm dd/MM/yyyy.
##### view methods [POST /erc20]
To perform a view method user must send following values:
- type (string)            The contract type. [GenericTokenCrowdsale, GenericToken].
- method (string)          The name the method you want to execute.
- args (object)            The arguments required by the function.
###### GenericTokenCrowdsale Methods:
* hasClosed: This method ouputs true if crowdsale has finished, else returns false.
* rate: This method returns the exchange rate of the token.
* cap: This method returns the maxium amount of ether that will be raised in the crowdsale.
* weiRaised:  This method returns the amount of wei raised up to the moment
* openingTime: This method returns the crowdsale opening time.
* closingTime: This method returns the crowdsale closing time.
* capReached:  This method returns true if the cap has been reached, elsewere returns false.
* wallet: This method returns the address that will hold the ethers after the ERC20 finish.
* token: This method returns the contract address of token being sold.
###### GenericToken Methods:
* mintingFinished: This method returns true if minting is no more aviliable, elsewere returns false.
##### write methods [PATCH /erc20]
To perform a write method user must send following values:
- address (address)   The address of the ERC20.
- method (string)     The name the method you want to execute.
- args (object)       The arguments required by the function.
- value (int)         The value in ethers. Mostly used when the user want to buy tokens.
###### Methods:
* buyTokens: Payable function for token purchase.
parameter:
    - beneficiary Address performing the token purchase.