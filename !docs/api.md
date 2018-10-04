# api

## Status Endpoints

### Get Bitsign Status

**GET:**&nbsp; https://api.bitsign.io/status

This endpoint returns several information about Bitsign Blockchain. Doesn't require any Header parameter 

##### Response

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
      {
        "enode": "enode://af49036045a5d1a03d0b92f80cd49b4a2d44cffe9f030edaadab88666326bf814cbebf66425e9be42fefd1d44faf87663a26dc5fe373f5dce2375bc5603fd2ea@172.17.0.4:33460",
        "client": "Parity/v1.9.5-stable-ff821da-20180321/x86_64-linux-gnu/rustc1.24.1"
      },
      {
        "enode": "enode://c458190c609ec59d74c4a4857feb48c10f4675ab9bd8f57c750ee57c90b4fdf3d845b82da93bec958b8bb8d014774de85c1795ba54867430ca195977828011a0@172.17.0.5:38734",
        "client": "Parity/v1.9.5-stable-ff821da-20180321/x86_64-linux-gnu/rustc1.24.1"
      }
    ]
  },
  "error": null
}
```

### Get nodes information

**GET:**&nbsp; https://api.bitsign.io/nodes

This endpoint returns the list of nodes

#####  Response

_example :&nbsp;_
```json
{
  "success": true,
  "data": [ "enode://8dbd67c79b74364596fac6816c1b0c188c85fb0cad46415ce310a6f9fba5cee713943bb9dfe1dd864081416fe91a9fa013f2ac21607826d79bcfe3d449e72b0d@193.70.64.150:37004",
    "enode://af49036045a5d1a03d0b92f80cd49b4a2d44cffe9f030edaadab88666326bf814cbebf66425e9be42fefd1d44faf87663a26dc5fe373f5dce2375bc5603fd2ea@172.17.0.4:33460"],
  "error": null
}
```

## User Endpoints

### User Info 

**GET:**&nbsp; https://api.bitsign.io/api/v2/user?email={user_email}&password={some_password}

This endpoint retrieves token and Ethereum keys needed to interact with the rest of the endpoints.

##### Header parameters

| name     | type   | description           | example          | required |
| -------- | ------ | --------------------- | ---------------- | -------- |
| email    | String | Unique email address. | alice@crypto.com | yes      |
| password | String | User password.        | usrpwd           | yes      |

##### Response

_example :&nbsp;_

```json
{
  "success": true,
  "data": {
    "username": "alice",
    "email": "alice@crypto.com",
    "ethereum": {
      "address": "0x31EA7fcdc6f2187e12dac64848b5BCb2A4537b07",
      "keystore": {
        "crypto": {
          "cipherparams": {
            "iv": "4ab1957715b97dbb8865265eb92853aa"
          },
          "kdfparams": {
            "c": 10240,
            "dklen": 32,
            "prf": "hmac-sha256",
            "salt": "7e83523025fc9c206fa2f1c8595014bd3f49172eb29a76c58dfb2587c505bdad"
          },
          "cipher": "aes-128-ctr",
          "ciphertext": "24bcef92589997d8de9c0c233be6e72225642586f52639f19eb51e6065181d40",
          "kdf": "pbkdf2",
          "mac": "5a01d5f2fa910156cd30bf2509bd9c991be409247eeb5c31422209f9d26572d0"
        },
        "_id": "5b654f46892c0d552eb2a7d1",
        "address": "31EA7fcdc6f2187e12dac64848b5BCb2A4537b07",
        "id": "bbe8c5a4-2f77-b53d-870f-659b49153589",
        "meta": "{}",
        "name": "",
        "version": 3
      }
    },
    "token": "79645a7593f3ee75b7264fc497401163e22dc596c86a561015a6480158742bb3"
  },
  "error": null
}
```

### New User 
**POST:**&nbsp; https://api.bitsign.io/api/v2/user

Create new user trough our API to get token access and pre-configured Ethereum keys. With the token you can query all other endpoints and interact with all blockchains and the Smart Contracts.

##### Body atributes

| name     | type   | description           | example          | required |
| -------- | ------ | --------------------- | ---------------- | -------- |
| email    | string | Unique email address. | alice@crypto.com | yes      |
| password | string | User password.        | usrpwd           | yes      |
| username | string | Unique user name.     | alice            | yes      |


_Request example (application/json):&nbsp;_

```json
{
    "email": "alice@crypto.com",
    "password": "some_crafty_password",
    "username": "alice"
}
```

### Change Password 
**PUT:**&nbsp; https://api.bitsign.io/api/v2/user

This endpoint allows the user to changes their password. You must send the old password and the new one that must respect our security policies.

##### Body atributes

| name         | type   | description           | example          | required |
| ------------ | ------ | --------------------- | ---------------- | -------- |
| email        | string | Unique email address. | alice@crypto.com | yes      |
| password     | string | User password.        | usrpwd           | yes      |
| new password | string | User new password.    | new_password     | yes      |

_Request example (application/json):&nbsp;_

```json
{
    "email": "alice@crypto.com",
    "password": "crafty_password!",
    "newPassword": "new_crafty_password"
}
```

## Transaction Endpoints
### Notarization TX 

**POST:**&nbsp; https://api.bitsign.io/eth/notarizetx

This endpoints uses data field input to create a **notary transaction** and include it in a new block. Transactions from this endpoints will be executed **from Bitsign's main node** to facilitate its creation. If you want to create your own transaction and send it from your account please use **sendRawTX endpoint instead**.

##### Body atributes

| name     | type   | description            | example | required? |
| -------- | ------ | ---------------------- | ------- | --------- |
| token    | string | User token.            | ey..yk  | yes       |
| data     | string | Data to notarize.      | 0x..3F  | yes       |
| address  | string | User ethereum address. | 0x..m3  | yes       |
| password | string | User password.         | usrpwd  | yes       |

_Request example (application/json):&nbsp;_

```json
{
    "token": "<your_token>",
    "data": "<some_hexadecimal_data>",
    "address": "<your_ethereum_address>",
    "password": "<your_password>"
}
```

### Get transactions by user
**GET:**&nbsp; https://api.bitsign.io/api/v2/transactions?token=token&hash=hash

This endpoint returns the transactions executed by the user. JWT token is a required parameter, but the tx hash is an optional parameter. 

##### Header parameters

| name  | type              | description | example | required |
| ----- | ----------------- | ----------- | ------- | -------- |
| token | User token.       | String      | 65..a5  | yes      |
| hash  | Transaction hash. | String      | 0x..a4  | no       |

##### Response

Passing tx hash as a parameter will return information of the corresponding transaction if exist, elsewere will return the list of all transactions executed by the user.

_example :&nbsp;_

```json
{
  "success": true,
  "data": [
    {
      "created": {
        "by": "5b460f46892c0d552eb2d1a8",
        "date": "2018-07-12T14:41:06.074Z"
      },
      "transaction": {
        "blockNumber": 441763,
        "hash": "0x666cb025d4e8813e29a9955c37eb86586a3f150d8e50202b5da4040afa9c85a4",
        "data": "0x42a46be94ae2242bdc13620cb065e64391059b8f909e27208293f462f3dd51669811446b3f8227c72bf6a1cf2628584429578b5d41756fbd02b40b45bfaf6de9"
      },
      "_id": "5b476882892c0d552eb2a6a4",
      "__v": 0
    },
    {
      "created": {
        "by": "5b460f46892c0d552eb2d1a8",
        "date": "2018-07-17T14:24:20.847Z"
      },
      "transaction": {
        "blockNumber": 459169,
        "hash": "0x0894280fb0574bb025726f5fdf69cb5ae72785cc186c77936870b22e40b6e69c",
        "data": "0x79645a7593f3ee75b7264fc497401163e22dc596c86a561015a6480844376aa3"
      },
      "_id": "5b4dfc14892c0d552eb2a654",
      "__v": 0
    }
  ],
  "error": null
}
```

## Raw Transactions Endpoints

### SendRawTransaction 

**POST:**&nbsp; https://api.bitsign.io/eth/signedRawTx

If you don't trust or don't want to use the **keypair provided by Bitsign**, you can always call this endpoint that will publish your **offline
signed** raw [transaction](https://web3js.readthedocs.io/en/1.0/web3-eth.html#sendsignedtransaction).&nbsp;Bitsign node will only handle gas cost and transaction publication,
but you have to **craft the entire transaction** on your end.
We will be releasing Bitsign tx library to facilitate this process soon.

##### Body atributes

| name  | type   | description                               | example    | required? |
| ----- | ------ | ----------------------------------------- | ---------- | --------- |
| token | string | User token.                               | ey..yk     | yes       |
| env   | string | Environment to deploy the smart contract. | production | yes       |
| tx    | string | Signed data.                              | 0x..m3     | yes       |

##### Request

_example :&nbsp;_

```json
{
  "token": "65287a7593f3ee75b7264fc497401163e22dc596c86a561015a6480844365ade",
  "env": "production",
  "tx": "0x65a2d5df2ed2f5e1d848ed214df65a2d5df2ed2f5e1d848ed214df65a2d5df2e"
}
```

##### Response

_example :&nbsp;_

```json
{
  "success": true,
  "data": [
    {
      "_id": "5a5ccafb6e04ee60282f3c0b",
      "__v": 0,
      "transaction": {
        "blockNumber": 26198,
        "hash": "0x295a9ebc3becf2bd508e8fbe16e7d61456aaf0f333faeafbfdc137c44a1fa78b"
      },
      "created": {
        "by": "5a36ebc6e36eaa130e301e51",
        "date": "2018-01-15T15:38:35.580Z"
      }
    }
  ],
  "error": null
}
```


## Smart Contract Endpoints

### Deploy new Smart Contract 

**PUT:**&nbsp; https://api.bitsign.io/eth/contract

This endpoint allows the user to deploy a new smart contract.

##### Body atributes

| name  | type   | description                                       | example         | required? |
| ----- | ------ | ------------------------------------------------- | --------------- | --------- |
| token | string | User token.                                       | ey..yk          | yes       |
| env   | string | Environment to deploy the smart contract.         | production      | yes       |
| args  | object | Constructor arguments for each specified contract | descrided below | yes       |
| type  | string | Contract type to deploy.                          | Escrow          | yes       |
| value | string | Value in ethers to send to the smart contract.    | 0               | yes       |

#### Notarize

This smart contract allows the user to notarize documents. In order to initialize Notarize contract the user must send an address, that will be set as the owner of the contract. The owner will be the only one that is able to notarize.

##### Constructor
| name  | type    | description                                                     | example |
| ----- | ------- | --------------------------------------------------------------- | ------- |
| _user | address | Ethereum address that will be set as the owner of the contract. | 0x..m3  |

##### Request

_example :&nbsp;_

```json
{
  "token": "65287a7593f3ee75b7264fc497401163e22dc596c86a561015a6480844365ade",
  "env": "production",
  "args": {
    "_user": "0x21EA7fcdc6f2187e12dac64848b5BCb2A4537b07",
  },
  "type": "Notarize",
  "value": "0"
}
```

##### Response

_example :&nbsp;_

```json
{
  "success": true,
  "data": {
    "date": {
      "created": "2018-10-03T13:02:41.062Z"
    },
    "owner": {
      "email": "user@mail.com",
      "address": "0x21EA7fcdc6f2187e12dac64848b5BCb2A4537b07"
    },
    "abi": [ {"..."} ],
    "events": [],
    "_id": "5bb4bdf1623ac07205d867c4",
    "type": "Notarize",
    "gas": 214506,
    "bytecode": "0x...29",
    "address": "0x154cD78cB526700c6547F7Ccd531858AFf485d4a",
    "encodedAbi": "0000000000000000000000006a5df2cdc6f2187eda8a4b4848b5bcb2a4537b07",
    "txHash": "0x528ff7a09bcc8ded727f405c568352fd865a2dfaa353e31ea2b6e096dd2ba938",
    "__v": 0,
    "contractExplorerUrl": "http://explorer.bitsign.io/account/0x154cD78cB526700c6547F7Ccd531858AFf485d4a",
    "txExplorerUrl": "http://explorer.bitsign.io/tx/0x528ff7a09bcc8ded727f405c568352fd865a2dfaa353e31ea2b6e096dd2ba938"
  },
  "error": null
}
```

#### Escrow

This smart contract allows the user to deposit funds in the smart contract and define a buyer and a seller. Each actor can release the funds to the other part based on pre established conditions. Also there is BSG arbiter which act as an impartial third party that can release the payment to one party in case the other part breaks the initial conditions.The sender of the transaction will be the arbiter of the contract.

##### Constructor

| name     | type    | description                                       | example |
| -------- | ------- | ------------------------------------------------- | ------- |
| _seller  | address | Ethereum address that will act as the seller.     | 0x..m3  |
| _seller  | address | Ethereum address that will act as the buyer.      | 0x..m3  |
| _endTime | uint    | estimated end time of the proccess, in unix time. | 0x..m3  |

##### Request

the value of the selling proccess should be passed in order to set funds on the contract.

_example :&nbsp;_

```json
{
  "token": "65287a7593f3ee75b7264fc497401163e22dc596c86a561015a6480844365ade",
  "env": "production",
  "args": {
    "_seller": "0x21EA7fcdc6f2187e12dac64848b5BCb2A4537b07",
    "_buyer": "0x21EA7fcdc6f2187e12dac64848b5BCb2A4537b07",
    "_endTime": "1539573172",
  },
  "type": "Escrow",
  "value": "1"
}
```

##### Response

_example :&nbsp;_

```json
{
  "success": true,
  "data": {
    "date": {
      "created": "2018-10-03T13:32:20.344Z"
    },
    "owner": {
      "email": "user@mail.com",
      "address": "0x21EA7fcdc6f2187eDA8A4b4848b5BCb2A4537a54"
    },
    "abi": [{"..."} ],
    "events": [],
    "_id": "5bb4c4e4623ac0720a54d7cd",
    "type": "Escrow",
    "gas": 379849,
    "bytecode": "0x...29",
    "address": "0xE2FA4c7FdcD36d9247B2DDa79af415764ad36B18",
    "encodedAbi": "000000000000000000000000987cd4e646c9d9981ee94c24a57841abb55f99e700000000000000000000000044751576b07eee07de3d8d5bfb9c8dd77add1744000000000000000000000000000000000000000000000000000000005b67ed4",
    "txHash": "0xe4103be516ceb4ffc6fadf7e0d652874be4ced404922fe0c0b14c53eaef9f8a3",
    "__v": 0,
    "contractExplorerUrl": "http://explorer.bitsign.io/account/0xE2FA4c7FdcD36d9247B2DDa79af415764ad36B18",
    "txExplorerUrl": "http://explorer.bitsign.io/tx/0xe4103be516ceb4ffc6fadf7e0d652874be4ced404922fe0c0b14c53eaef9f8a3"
  },
  "error": null
}
```

####  NotarizeTX

This smart contract allows the user to notarize transactions.

##### Constructor

| name      | type    | description                                   | example     |
| --------- | ------- | --------------------------------------------- | ----------- |
| _buyer    | address | Ethereum address that will act as the buyer.  | 0x..m3      |
| _seller   | address | Ethereum address that will act as the seller. | 0x..m3      |
| _id       | bytes32 | unique id of the transaction.                 | da..65      |
| _date     | string  | Date of transaction perform                   | "11/09/18"  |
| _value    | uint    | Value of the transaction                      | 452         |
| _hash     | bytes32 | Hash of transaction, could act as a integrity | df..26      |
| _status   | string  | State of transaction proccess                 | "purchased" |
| _shipping | string  | Shipping progress                             | "send"      |

##### Request

the value of the selling proccess should be passed in order to set funds on the contract.

_example :&nbsp;_

```json
{
  "token": "65258a6254d3ee75b7264fc497401163e22dc596c86a654d15a6480844376aa4",
  "env": "production",
  "args": {
    "_buyer": "0x534cd4e646c9d9981ee94c24a33221abb55f99e7",
	"_seller": "0x44751576b07eee07de3d8d5bfb9c8dd77add1744",
	"_id": "0x08551a53",
	"_date": "5/5/18",
	"_value": "2",
	"_hash":"0x9b5d1a613fa5f2524ab36b13103706e31fca06b229d87e9915b29fc20c1d76490",
	"_status": "purchased",
	"_shipping": "send"
  },
  "type": "NotarizeTx",
  "value": "0",
  "password": "user1234"
}
```

##### Response

_example :&nbsp;_

```json
{
  "success": true,
  "data": {
    "date": {
      "created": "2018-10-03T14:19:10.887Z"
    },
    "owner": {
      "email": "user@mail.com",
      "address": "0x25EA7fcdc6f2187eDA8254d848b5BCb2A4537b07"
    },
    "abi": [ {"..."} ],
    "events": [],
    "_id": "5bb4cfde623ac07205d867d4",
    "type": "NotarizeTx",
    "gas": 545091,
    "bytecode": "0x...29",
    "address": "0x2796bfA32e88eE558E3eB7a83E51FF1b55E225ad",
    "encodedAbi": "00...00",
    "txHash": "0x251sd9dcd5c7e44c96becd803ea286a66931821b506c3633c0f0f3c24e7b325a",
    "__v": 0,
    "contractExplorerUrl": "http://explorer.bitsign.io/account/0x2796bfA32e88eE558E3eB7a83E51FF1b55E225ad",
    "txExplorerUrl": "http://explorer.bitsign.io/tx/0x251sd9dcd5c7e44c96becd803ea286a66931821b506c3633c0f0f3c24e7b325a"
  },
  "error": null
}
```

### Contract Usage 

**GET:**&nbsp; https://api.bitsign.io/eth/contract/doc?token={token}&type={type}

This endpoint returns smart contract's ABI and functions to use its functionality.

##### Header parameters

| name  | type   | description          | example | required |
| ----- | ------ | -------------------- | ------- | -------- |
| token | String | User token.          | ey..yk  | yes      |
| type  | String | Smart Contract type. | Notary  | yes      |

##### Response

_example :&nbsp;_

```json
{
  "success": true,
  "data": [
     {
        "constant": true,
        "inputs": [
          {
            "name": "_data",
            "type": "bytes32"
          }
        ],
        "name": "getProof",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x1b80bb3a"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_data",
            "type": "bytes32"
          }
        ],
        "name": "notarize",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xcbef362f"
      },
      {
        "inputs": [
          {
            "name": "_user",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "name": "_data",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "_address",
            "type": "address"
          }
        ],
        "name": "Notary",
        "type": "event",
        "signature": "0x6daf688db5c79fe10fee0cf2f31d8bc8fbe535418562899c198aa744173011f6"
      }
  ],
  "error": null
}
```
### Call Contract Method 
**POST:**&nbsp; https://api.bitsign.io/eth/contract


This endpoint allows the user to read the state from the blockchain using contract methods.
This endpoint will not alter blockchain state and therefore wont cost gas.

##### Body atributes

| name  | type   | description                               | example    | required? |
| ----- | ------ | ----------------------------------------- | ---------- | --------- |
| token | string | User token.                               | ey..yk     | yes       |
| address | string | Address of the contract | 0x..e7 | yes |
| env   | string | Environment to deploy the smart contract. | production | yes       |
| method    | string | Method of the contract                   | getBalance     | yes       |
| Args | object | Arguments of the method, if required | {} | yes |
##### Request

_example :&nbsp;_

```json
{
    "token": "65287a7593f3ee75b7264fc497401163e22dc596c86a561015a6480844365ade",
    "address": "0x534cd4e646c9d9981ee94c24a33221abb55f99e7",
    "env": "production",
    "method": "getBalance",
    "args": {}
}
```

##### Response

_example :&nbsp;_

```json
{
    "success": true,
    "data": "10",
    "error": null
}
```

#### Aviliable methods

##### Notarize methods

| name     | description                               | args    |
| -----  | ----------------------------------------- | ---------- |
| getProof | Given some data, returns the address wich performed notarize(_data) method | - *_data:*&nbsp; (bytes32) Notarized data. |

#### Escrow methods

| name     | description                               | args    |
| -----  | ----------------------------------------- | ---------- |
| buyer  | Ethereum address that will act as the buyer. | - |
| seller  | Ethereum address that will act as the seller. | - |
| arbiter  | Ethereum address that will act as the arbiter, wich is the contract creator. | - |
| value  | Value sended in constructor | - |
| endTime  | estimated end time of the proccess, in unix time. | - |
| getBalance |  This method will return the balance of the contract. | - |

#### Notarize tx methods

| name     | description                               | args    |
| -----  | ----------------------------------------- | ---------- |
| BSG_NODE  |Ethereum address allowed to execute whrite metods, wich is the contract creator. | - |

### Execute Contract Method
**PATCH:**&nbsp; https://api.bitsign.io/eth/contract


This endpoint allows the user to send a transaction to the node and therefore modify the blockchain state.
Although this method will generally cost gas, there is no limitation about it when using BSG Chain and gas cost will be handled internally.


##### Body atributes

| name  | type   | description                               | example    | required? |
| ----- | ------ | ----------------------------------------- | ---------- | --------- |
| token | string | User token.                               | ey..yk     | yes       |
| address | string | Address of the contract | 0x..e7 | yes |
| env   | string | Environment to deploy the smart contract. | production | yes       |
| method    | string | Method of the contract                   | getBalance     | yes       |
| Args | object | Arguments of the method, if required | {} | yes |

##### Request

_example :&nbsp;_

```json
{
    "token": "",
    "address": "<contract_address>",
    "env": "production",
    "method": "kill",
    "args": { }
}
```

##### Response

_example :&nbsp;_

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

#### Aviliable methods

##### Notarize methods

| name     | description                               | args    |
| -----  | ----------------------------------------- | ---------- |
| notarize | This method receive as a parameter a bytes32 that will be the evidence to be notarized. The owner of the contract will be the only one that is capable of execute this method. If the sender is not the owner, the tx will be reverted. After the evidence is notarized the Notary event will be raised with two parameters: the evidence and the address. | *_data:*&nbsp; data to sign. |

##### Escrow methods

| name     | description                               | args    |
| -----  | ----------------------------------------- | ---------- |
| pay | This method can be executed by the buyer or the arbiter. This method will transfer the balance of the contract to the seller address. After that, it will raise the Payout event with two parameters: balance and seller address. | - |
| refund | This method can be executed by the seller or the arbiter. This method will transfer the balance of the contract to the buyer address. After that, it will raise the Refund event with two parameters: balance and buyer address. | - | 
| kill | This method can be executed by the arbiter only. It will destruct the contract and send the balance of the contract to its address. | - |

##### Notarize Tx methods
| name     | description                               | args    |
| -----  | ----------------------------------------- | ---------- |
| updateStatus | This method can be executed by the buyer or the BSG node. Also it checks that the id passed is the same as one that user sent when deployed.  The main purpose of this method is to update the tx status. After the method notarize the new tx, it raise the NotaryEvt event with the parameters: hash (bytes32) and id (bytes32) | *_status:*&nbsp;(string): Status to update. <br> *_hash:*&nbsp;(bytes32) hash of the tx. <br> *_id:*&nbsp;(bytes32) Id of the tx. |

| updateShipping | This method can be executed by the buyer or the BSG node. Also it checks that the id passed is the same as one that user sent when deployed. The main purpose of this method is to update the tx shipping. After the method notarize the new tx, it raise the NotaryEvt event with the parameters: hash (bytes32) and id (bytes32). | *_shipping:*&nbsp;(string): Shipping to update. <br> *_hash:*&nbsp;(bytes32) hash of the tx. <br> *_id:*&nbsp;(bytes32) Id of the tx. | 

### [Get deployed contracts by user 
**GET:**&nbsp; https://api.bitsign.io/api/v2/contracts?token={token}

This endpoint returns the contracts deployed by the user.
##### Header parameters

| name     | type   | description           | example          | required |
| -------- | ------ | --------------------- | ---------------- | -------- |
| token | String | User token.          | ey..yk  | yes      |

##### Response

_example :&nbsp;_

```json
{
  "success": true,
  "data": [
    {
      "address": "0xb42B83621125b8f523dC3ca197168439e139744D",
      "contractExplorerUrl": "http://explorer.bitsign.io/account/0xb42B83621125b8f523dC3ca197168439e139744D",
      "date": {
        "created": "2018-03-15T01:13:21.932Z"
      },
      "encodedAbi": "0000000000000000000000000593ce5dc23005d15bdf39be68e84ee83fd6b3be",
      "type": "Notarize",
      "txHash": "0xba1eb2c8ea051b66a24fa300b7c0eec0e7dc4d65552859e0221963658c1d504b",
      "txExplorerUrl": "http://explorer.bitsign.io/tx/0xba1eb2c8ea051b66a24fa300b7c0eec0e7dc4d65552859e0221963658c1d504b"
    }
  ],
  "error": null
}
```

## Crowdsale 

### Deploy new ERC20 Token Crowdsale Smart Contract 
**PUT:**&nbsp; https://api.bitsign.io/erc20

This endpoint allows to create a new erc20 crowdsale. By this, user will deploy at same time:

- ERC20 Mintable Token Contract: Simple ERC20 Token example, with mintable token creation. That function allows users with the MinterRole to call the mint() function and mint tokens to users. Minting can also be finished, locking the mint() function's behavior.
- Crowdsale Contract: Allows user allocate tokens to network participants in various ways, mostly in exchange for Ether. Crowdsale have diferent properties:
    - Minted: The Crowdsale mints tokens when a purchase is made.
    - Capped: Adds a cap to your crowdsale, invalidating any purchases that would exceed that cap.
    - Timed: Adds an openingTime and closingTime to user crowdsale.

##### Required values

To perform a deploy user must send following values:

- **env (string):&nbsp;** Enviroment to perform the method.

- **email (string):&nbsp;** The user email.

- **args (object):&nbsp;** The arguments required are the constructor arguments of the crowdsale contract, listed below:

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

### View contract methods
This section explains how the user to read the state from the blockchain using erc20 contract methods. These will not alter blockchain state and therefore wont cost gas.

##### Required values

There are 2 possible endpoints, one for call token contract, and the another for crowdsale contract. To perform a view method user must send following values:

- _env (string):&nbsp;_ Enviroment to perform the method

- _address (address):&nbsp;_ Address of deployed contract

- _method (string):&nbsp;_ The name the method you want to execute.

- _args (object):&nbsp;_ The arguments required by the function.

#### Generic Token Crowdsale Methods 
**POST:** &nbsp; https://api.bitsign.io/erc20/genericTokenCrowdsale

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

#### Generic Token Methods 
**POST:** &nbsp; https://api.bitsign.io/erc20/genericToken

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

### Write methods 
**PATCH:** &nbsp; https://api.bitsign.io/erc20
Endpoint for execute a write method over an ERC20 crowdsale. These methods change the state of blockchain, so requires gas usage by sender address. Elsewere, transaction will fail. 

##### Required values

To perform a write method user must provide following values:

- _env (string):&nbsp;_       Enviroment to perform the method
- _address (address):&nbsp;_  The address of the ERC20.
- _method (string):&nbsp;_    The name the method you want to execute. 
- _args (object):&nbsp;_      The arguments required by the function.
- _value (uint):&nbsp;_        The value in ethers. Mostly used when the user want to buy tokens.

#### Available methods

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

### retrieve deployed ERC20 
**GET:** &nbsp; https://api.bitsign.io/erc20
This endpoint allows user to retrieve a list of deployed contrats by user, as well as information about a specific contract instance

##### Required value

To perform a write method user must provide following values:

- **email (string):&nbsp;** The user email.

##### Optional value

If this value is sent, response will show information about a specific contract instance.

- **_id (string):&nbsp;** The ERC20 mongoDB's _id. This value is returned for each contract owned by user in a non _id specified query.


_Request example (application/json):&nbsp;_
```json
{
    	"email" : "user@example.com"
}
```
