# Status Endpoints

## Get Bitsign Status

**GET:**&nbsp; https://api.bitsign.io/status

This endpoint returns several information about Bitsign Blockchain.

#### Response

_example:&nbsp;_

```json
{
  "success": true,
  "data": {
    "status": "Running, healthy",
    "lastblock": 20201,
    "hash": "0x2c1b018d0cb86087f7e226459e998e6b7515bc6bf529833c90f8e3883d290c49",
    "timestamp": 1515282880,
    "explorer": "https://explorer.bitsign.io/block/20201",
    "bootnodes": [
      "enode://a891225909f70a4ee3f40c1dac05da763fe0354d5f259922abf841db51706283d2957c09fc7266e5f4633583a34dbef3f38a769eb35551788740a06e387dfa2a@159.203.176.160:30303",
      "enode://b21d8b85165319a86c822dadcd51fbaf1aca3fe7854df8644c03ac304e34205d31d44d0eac7dd6366a8f8a621eeb2198d9644090d59771148fb3ac92630d2dd6@198.211.100.127:30303"
    ]
  },
  "error": null
}
```

## Get nodes information

**GET:**&nbsp; https://api.bitsign.io/nodes

This endpoint returns the list of nodes

####  Response

_example :&nbsp;_
```json
{
  "success": true,
  "data": [ "enode://<public_key>@<ip_address>:<port>",
            "enode://<public_key>@<ip_address>:<port>"],
  "error": null
}
```

# User Endpoints

## User Info 

**GET:**&nbsp; https://api.bitsign.io/api/v2/user?email={user_email}&password={some_password}

This endpoint retrieves token and Ethereum keys needed to interact with the rest of the endpoints.

#### Header parameters

| name     | type   | description           | example              | required |
| -------- | ------ | --------------------- | -------------------- | ---| 
| email | Unique email address. |  String |alice@crypto.com. | yes |
| password | User password |  String |some_crafty_password. | yes | 

#### Response

_example :&nbsp;_

```json
{
  "success": true,
  "data": {
    "username": "user123",
    "email": "user@hotmail.com",
    "ethereum": {
      "address": "0x31EA7fcdc6f2187eDA8A4b4848b5BCb2A4537b07",
      "keystore": {
        "crypto": {
          "cipherparams": {
            "iv": "4ab1957715b97dbb8876924eb92853aa"
          },
          "kdfparams": {
            "c": 10240,
            "dklen": 32,
            "prf": "hmac-sha256",
            "salt": "7e83523025fc9c206fa2f1c8595014bd3f49172eb29a76c58dfb6324c505bdad"
          },
          "cipher": "aes-128-ctr",
          "ciphertext": "24bcef92589997d8de9c0c233be6e72293806886f52639f19eb51e6065181d40",
          "kdf": "pbkdf2",
          "mac": "5a01d5f2fa910156cd30bf2509bd9c991be409247eeb5c31422209f9d48362d0"
        },
        "_id": "5b460f46892c0d552eb2a7d3",
        "address": "31ea7fcdc6f2187eda8a4b4848b5bcb2a4537b07",
        "id": "bbe8c5a4-2f77-b53d-870f-659b49541598",
        "meta": "{}",
        "name": "",
        "version": 3
      }
    },
    "token": "79645a7593f3ee75b7264fc497401163e22dc596c86a561015a6480844376bb3"
  },
  "error": null
}
```

## New User 
**POST:**&nbsp; https://api.bitsign.io/api/v2/user

Create new user trough our API to get token access and pre-configured Ethereum keys. With the token you can query all other endpoints and interact with all blockchains and the Smart Contracts.

#### Atributes

| name     | type   | description           | example              | required |
| -------- | ------ | --------------------- | -------------------- | ---| 
| email    | string | Unique email address. | alice@crypto.com     | yes |
| password | string | User password.        | some_crafty_password | yes |
| username | string | Unique user name.     | alice                | yes |


_Request example (application/json):&nbsp;_

```json
{
    "email": "alice@crypto.com",
    "password": "some_crafty_password",
    "username": "alice"
}
```

## Change Password 
**PUT:**&nbsp; https://api.bitsign.io/api/v2/user

This endpoint allows the user to changes their password. You must send the old password and the new one that must respect our security policies.

#### Atributes

| name         | type   | description           | example          | required |
| -------- | ------ | --------------------- | -------------------- | ---|
| email        | string | Unique email address. | alice@crypto.com | yes |
| password     | string | User password.        | some_password    | yes |
| new password | string | User new password.    | new_password     | yes |

_Request example (application/json):&nbsp;_

```json
{
    "email": "alice@crypto.com",
    "password": "crafty_password!",
    "newPassword": "new_crafty_password"
}
```

# Transaction Endpoints
## Notarization TX 

**POST:**&nbsp; https://api.bitsign.io/eth/notarizetx

This endpoints uses data field input to create a **notary transaction** and include it in a new block. Transactions from this endpoints will be executed **from Bitsign's main node** to facilitate its creation. If you want to create your own transaction and send it from your account please use **sendRawTX endpoint instead**.

#### Atributes

| name     | type   | description            | example             | required? |
| -------- | ------ | --------------------- | -------------------- | ---|
| token    | string | User token.            | ey..yk              | yes |
| data     | string | Data to notarize.      | 0x..3F              | yes |
| address  | string | User ethereum address. | 0x..m3              | yes |
| password | string | User password.         | new_crafty_password | yes |

_Request example (application/json):&nbsp;_

```json
{
    "token": "<your_token>",
    "data": "<some_hexadecimal_data>",
    "address": "<your_ethereum_address>",
    "password": "<your_password>"
}
```

## Get transactions by user
**GET:**&nbsp; https://api.bitsign.io/api/v2/transactions?token=token&hash=hash

This endpoint returns the transactions executed by the user. JWT token is a required parameter, but the tx hash is an optional parameter.

#### Header parameters

| name     | type   | description           | example              | required |
| -------- | ------ | --------------------- | -------------------- | ---| 
| token | User token. | String | ey..yk | yes | 
| hash | Transaction hash. |  String | 0x..3F  | no | 

# Raw Transactions Endpoints

## SendRawTransaction 
**POST:**&nbsp; https://api.bitsign.io/eth/signedRawTx

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

# Smart Contract Endpoints
## Deploy new Smart Contract 
**PUT:**&nbsp; https://api.bitsign.io/eth/contract

This endpoint allows the user to deploy a new smart contract. The available smart contracts are:

#### Notarize
This smart contract allows the user to notarize documents.
##### Constructor
In order to initialize Notarize contract the user must send an address, that will be set as the owner of the contract. The owner will be the only one that is able to notarize.
##### Methods
* notarize: This method receive as a parameter a bytes32 that will be the evidence to be notarized. The owner of the contract will be the only one that is capable of execute this method. If the sender is not the owner, the tx will be reverted. After the evidence is notarized the Notary event will be raised with two parameters: the evidence and the address.

#### Escrow
This smart contract allows the user to deposit funds in the smart contract and define a buyer and a seller. Each actor can release the funds to the other part based on pre established conditions. Also there is BSG arbiter which act as an impartial third party that can release the payment to one party in case the other part breaks the initial conditions.
##### Constructor
In order to initialize Escrow contract the user must send _seller (address), _buyer (address) and _endTime (uint). The sender of the transaction will be the arbiter of the contract. The arbiter act as an impartial third party. Also the value should be passed in order to set funds on the contract.
##### Methods
* pay: This method can be executed by the buyer or the arbiter. This method will transfer the balance of the contract to the seller address. After that, it will raise the Payout event with two parameters: balance and seller address.
* refund: This method can be executed by the seller or the arbiter. This method will transfer the balance of the contract to the buyer address. After that, it will raise the Refund event with two parameters: balance and buyer address.
* getBalance: This method will return the balance of the contract. It can be executed by any member of the contract.
* kill: This method can be executed by the arbiter only. It will destruct the contract and send the balance of the contract to its address.

####  NotarizeTX
##### Constructor
In order to initialize NotarizeTx contract the user must send the following values:
- buyer (address)
- seller (address)
- id  (bytes32)
- date (string)
- value (uint)
- hash (bytes32)
- status (string)
- shipping (string)
##### Methods
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

## [Contract Usage 
**GET:**&nbsp; https://api.bitsign.io/eth/contract/doc?token={token}&type={type}

This endpoint returns smart contract's ABI and functions to use its functionality.

+ Parameters

    + token: <user_token> (string) - User token.
    + type: <contract_name> (string) - Smart Contract type.

## [Call Contract Method 
**POST:**&nbsp; https://api.bitsign.io/eth/contract


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

## Execute Contract Method
**PATCH:**&nbsp; https://api.bitsign.io/eth/contract


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

## [Get deployed contracts by user 
**GET:**&nbsp; https://api.bitsign.io/api/v2/contracts?token={token}

This endpoint returns the contracts deployed by the user.

+ Parameters

    + token: <user_token> (string) - User token.

# Crowdsale 

## Deploy new ERC20 Token Crowdsale Smart Contract 
**PUT /erc20**

This endpoint allows to create a new erc20 crowdsale. By this, user will deploy at same time:

- ERC20 Mintable Token Contract: Simple ERC20 Token example, with mintable token creation. That function allows users with the MinterRole to call the mint() function and mint tokens to users. Minting can also be finished, locking the mint() function's behavior.
- Crowdsale Contract: Allows user allocate tokens to network participants in various ways, mostly in exchange for Ether. Crowdsale have diferent properties:
    - Minted: The Crowdsale mints tokens when a purchase is made.
    - Capped: Adds a cap to your crowdsale, invalidating any purchases that would exceed that cap.
    - Timed: Adds an openingTime and closingTime to user crowdsale.

#### Required values

To perform a deploy user must send following values:

- **env (string):&nbsp;** Enviroment to perform the method.

- **email (string):&nbsp;** The user email.

- **args (object):&nbsp;** The arguments required by the function. In this case, the constructor arguments, listed below:

    - **_name (string):&nbsp;** The name of the token.

    - **_symbol (string):&nbsp;** The abreviation of the token.
    
    - **_decimals (uint):&nbsp;** The quantity of decimals which a token can be splitted.
    
    - **_rate (uint):&nbsp;** The rate of the token.
    
    - **_wallet (address):&nbsp;** The address that will hold the ethers after the ERC20 finish.
    
    - **_cap (uint):&nbsp;** The top quantity of ethers that can be buyed.
    
    - **_openingTime (date):&nbsp;** The estimated opening time of the erc20 crowdsale.
    
    - **_closingTime (date):&nbsp;** The estimated closing time of the erc20 crowdsale.

_Request example (application/json):&nbsp;_
```json
{	
    "env" : "production",
    "email" : "user@example.com",
    "args" : {
        "_name" : "token example", 
        "_symbol" : "toe", 
        "_decimals" : "12", 
        "_rate" : "2", 
        "_wallet" : "0x407d73d8a49eeb85d32cf465507dd71d507100c1", 
        "_cap" : "12", 
        "_openingTime" : "14:54 10/08/2019", 
        "_closingTime" : "14:54 11/08/2019"
    }
}
```

## View contract methods
This section explains how the user to read the state from the blockchain using erc20 contract methods. These will not alter blockchain state and therefore wont cost gas.

#### Required values

There are 2 possible endpoints, one for call token contract, and the another for crowdsale contract. To perform a view method user must send following values:

- _env (string):&nbsp;_ Enviroment to perform the method

- _address (address):&nbsp;_ Address of deployed contract

- _method (string):&nbsp;_ The name the method you want to execute.

- _args (object):&nbsp;_ The arguments required by the function.

### Generic Token Crowdsale Methods 
**POST /erc20/genericTokenCrowdsale**

A list of possible methods to call is provided down.

| Method      | Description                                                                          | Args |
| ----------- | ------------------------------------------------------------------------------------ | ---- |
| token       | This method returns the contract address of token being sold.                        | -    |
| wallet      | This method returns the address that will hold the ethers after the ERC20 finish.    | -    |
| rate        | This method returns the exchange rate of the token.                                  | -    |
| weiRaised   | This method returns the amount of wei raised up to the moment.                       | -    |
| cap         | This method returns the maxium amount of ether that will be raised in the crowdsale. | -    |
| capReached  | This method returns whether the cap was reached.                                     | -    |
| openingTime | This method returns the crowdsale opening time.                                      | -    |
| closingTime | This method returns the crowdsale closing time.                                      | -    |
| isOpen      | This method returns true if the crowdsale is open, false otherwise.                  | -    |
| hasClosed   | This method ouputs true if crowdsale has finished, else returns false.               | -    |

_Request example (application/json):&nbsp;_

```json
{
  "env" : "production",
  "address" : "0x5bB04Ba324E9AD0016De0122cA19Ef69ED0B31ec",
  "method" : "openingTime"
}
``` 

### Generic Token Methods 
**POST /erc20/genericToken**:

There are several methods to call with this endpoint, listed down.

| Method          | Description                                                                                                                                                   | Args                                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| totalSupply     | Retuns total number of tokens in existence.                                                                                                                   | -                                                                                                                                 |
| balanceOf       | Gets the balance of the specified address.                                                                                                                    | _owner (address):&nbsp;_ The address to query the the balance of.                                                                 |
| allowance       | Function to check the amount of tokens that an owner allowed to a spender. Returns a uint256 specifying the amount of tokens still available for the spender. | _owner (address):&nbsp;_ The address which owns the funds.<br> _spender (address):&nbsp;_ The address which will spend the funds. |
| mintingFinished | This method returns true if minting is no more aviliable, elsewere returns false.                                                                             | -                                                                                                                                 |
| isMinter        | Returns true if a given addres has mint permission, elsewere returns false                                                                                    | _account (address):&nbsp;_ Address to check minter permission                                                                     |

_Request example (application/json):&nbsp;_
```json
{
  "env" : "production",
  "address" : "0x5bB04Ba324E9AD0016De0122cA19Ef69ED0B31ec",
  "method" : "balanceOf",
  "args" : {
      "owner" : "0x2AC34Ba324E9AD0016De0122cA19Ef69ED0B31ec"
  }
}
```

## Write methods 
**PATCH /erc20**
Endpoint for execute a write method over an ERC20 crowdsale. These methods change the state of blockchain, so requires gas usage by sender address. Elsewere, transaction will fail. 

#### Required values

To perform a write method user must provide following values:

- _env (string):&nbsp;_       Enviroment to perform the method
- _address (address):&nbsp;_  The address of the ERC20.
- _method (string):&nbsp;_    The name the method you want to execute. 
- _args (object):&nbsp;_      The arguments required by the function.
- _value (uint):&nbsp;_        The value in ethers. Mostly used when the user want to buy tokens.

### Available methods

A list of possible methods to call is provided down.

| Method                 | Description                                                                                 | Args                                                                                                                                                                                                               |
| ---------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| buyTokens              | Perform token purchase                                                                      | _\_beneficiary (address):&nbsp;_ Address performing the token purchase                                                                                                                                             |
| token.transfer         | Transfer token for a specified address.                                                     | _\_to (address):&nbsp;_ The address to transfer to. <br> _\_value (uint):&nbsp;_ The amount to be transferred, in wei.                                                                                             |
| token.transferFrom     | Transfer tokens from one address to another.                                                | _\_from (address):&nbsp;_ The address which you want to send tokens from <br> _\_to(address):&nbsp;_  The address which you want to transfer to <br> _\_value(uint):&nbsp;_ the amount of tokens to be transferred |
| token.approve          | Approve the passed address to spend the specified amount of tokens on behalf of msg.sender. | _\_spender(address):&nbsp;_ The address which will spend the funds. <br> _\_value(uint):&nbsp;_ The amount of tokens to be spent.                                                                                  |
| token.increaseApproval | Increase the amount of tokens that an owner allowed to a spender.                           | _\_spender(address):&nbsp;_ The address which will spend the funds. <br> _\_addedValue(uint):&nbsp;_ The amount of tokens to increase the allowance by.                                                            |
| token.decreaseApproval | Decrease the amount of tokens that an owner allowed to a spender.                           | _\_spender(address):&nbsp;_ The address which will spend the funds. <br> _\_subtractedValue (uint):&nbsp;_ The amount of tokens to decrease the allowance by.                                                      |


_Request example (application/json):&nbsp;_
```json
{
  "env" : "production",
  "address" : "0x6BCB63746ca81da8C7845f2Befc12B2a72372B57",
  "method" : "buyTokens",
  "args" : {
    "_beneficiary" : "0x6BCB63746ca81da8C7845f2Befc12B2a72372B57"
  },
  "value" : "1"
}
``` 

## retrieve deployed ERC20 
**GET /erc20**
This endpoint allows user to retrieve a list of deployed contrats by user, as well as information about a specific contract instance

#### Required value

To perform a write method user must provide following values:

- **email (string):&nbsp;** The user email.

#### Optional value

If this value is sent, response will show information about a specific contract instance.

- **_id (string):&nbsp;** The ERC20 mongoDB's _id. This value is returned for each contract owned by user in a non _id specified query.


_Request example (application/json):&nbsp;_
```json
{
    	"email" : "user@example.com"
}
```
