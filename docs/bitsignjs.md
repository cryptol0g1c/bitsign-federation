BitsignJS
=====

## Installation
Using npm:
```
npm install bitsignjs
```

## APIs
First of all you must instanciate the api with your token:
```
  const bitsignjs = require('bitsignjs');

  let api = bitsignjs.init(<your_token>);
```

## contracts
### api.contracts.deploy

```
  api.contracts.deploy({
    password: '<your_password>',
    type: '<type>',
    args: {}
  }).then(data => console.log(data))
```

### api.contracts.send

```
  api.contracts.send({
    password: '<your_password>',
    method: '<method>',
    args: {},
    address: '<contract_address>'
  }).then(data => console.log(data))
```

### api.contracts.call

```
  api.contracts.call({
    password: '<your_password>',
    method: '<method>',
    args: {},
    address: '<contract_address>'
  }).then(data => console.log(data))
```

### api.contracts.docs

```
  api.contracts.docs(<type>).then(data => console.log(data))
```

### api.contracts.deployed

```
  api.contracts.deployed().then(data => console.log(data))
```

## eth
### api.eth.status

```
  api.eth.status().then(data => console.log(data))
```

## transactions
### api.transactions.notarizeTx

```
  api.transactions.notarizeTx({
    address: '0x...',
    data: '<data>',
    password: '<your_password>'
  }).then(data => console.log(data))
```

## RawTx
In order to use create and/or send a raw tx you don't need to init the library or pass the token.

### bitsignjs.createRawTx
You must send:
* sender: Sender address.
* privateKey: Private key of the sender address.
* to: Address of the transaction destination.
* value: Value in ethers.

```
  const bitsignjs = require('bitsignjs');

  bitsignjs.createRawTx({
    sender: '0x',
    privateKey: '...',
    to: '0x...',
    value: ''
  }).then(signedTx => console.log(signedTx))
```

### bitsignjs.signedRawTx

```
  const bitsignjs = require('bitsignjs');

  bitsignjs.signedRawTx(signedTx).then(data => console.log(data))
```
