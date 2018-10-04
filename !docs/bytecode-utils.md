# bytecode-utils

## This library is meant to be useful for developers that work over ethereum to help them to verify contracts.

### How to use?

``` js
const bytecodeUtils = require('bytecode-utils');
const utils = bytecodeUtils.init(<http_provider>);
```

## Methods

### compareBytecode
This method check if a deployed contract match bytecode to a contract passed by parameter.

#### Parameters

| name         | type    | description                                             | default  |
| ------------ | ------- | ------------------------------------------------------- | -------- |
| address      | String  | Address of deployed contract                            | -        |
| solcVersion  | String  | Compiler version                                        | 'latest' |
| contractCode | String  | Code to match with deployed contract                    | -        |
| contractName | String  | Name of the deployed contract                           | -        |
| optimized    | Numeric | 1 if the contract compilation is optimized, elsewere 0. | 1        |

_example:&nbsp;_

```javascript
utils.compareBytecode( "0x..e7", "latest", "0x..29","myContract" , 0)
```

#### Returns

**Type:**&nbsp;JSON

_example:&nbsp;_

```json
{
  "match": true,
  "msg": "bytecode and metadata match exactly"
}
```

### compile
This method compiles a contract and process the output for later usage.

#### Parameters

| name         | type    | description                                             | default    |
| ------------ | ------- | ------------------------------------------------------- | ---------- |
| solcVersion  | String  | Compiler version                                        | 'latest'   |
| contractCode | String  | Code of the contract to compile                         | -          |
| contractName | String  | Name of the contract.                                   | -          |
| optimized    | Numeric | 1 if the contract compilation is optimized, elsewere 0. | Default: 1 |

_example:&nbsp;_

```javascript
utils.compile("latest", "0x..e7", "0x..29", "myContract" , 0)
```

#### Returns

**Type:**&nbsp;JSON

_example:&nbsp;_

```json
{
 "assembly": '', //compiled assembly
 "bytecode": {
  "deployed": '', // compiled bytecode
  "runtime": '', // compiled runtime bytecode,
  "functional": '' // compiled functional bytecode
 },
 "auxdata": '', // aux data
 "abi": '', // ABI
 "opcodes": '', // opcodes
 "metadata": '', // metadata
 "swarm": '' // swarm
}
```

### getContractCode
Return the contract bytecode from a deployed contract.

#### Parameters

| name    | type   | description                      | default |
| ------- | ------ | -------------------------------- | ------- |
| address | String | Address of the deployed contract | -       |

_example:&nbsp;_

```javascript
utils.getContractCode("0x534cd4e646c9d9981ee94c24a33221abb55f99e7")
```

#### Returns
**Type:**&nbsp;String

### getSolcVersion
Return a solc compiler instance from the passed version.

#### Parameters

| name    | type   | description                                  | default |
| ------- | ------ | -------------------------------------------- | ------- |
| version | String | Version of the defaultsolc compiler instance | -       |

#### Returns
**Type:**&nbsp;Solc instance

_example:&nbsp;_

```javascript
"0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056"
```
### processBytecode
Return a solc compiler instance from the passed version.

#### Parameters

| name            | type   | description                                      | default |
| --------------- | ------ | ------------------------------------------------ | ------- |
| _bytecode       | String | Bytecode of the contract.                        | -       |
| _parameterTypes | Array  | constructor parameters of the contract, if have. | no      |

_example:&nbsp;_

```javascript
utils.processBytecode("0x..29", [2, "owner"]))
```


#### Returns
**Type:**&nbsp;object

_example:&nbsp;_

```json
{ 
    "compiled": "0x60..29", //The bytecode set as parameter
    "metadata": "00..29", //Metadata hash
    "swarmHash": "dd792ef406ad68e2d292b0510152c174f8dabdb6969b8e5954062fa16b4d6836" // Merkle tree hash designed for the purpose of efficient storage and retrieval in content-addressed storage
}
```

### flatten
Make usage of truffle-flattener library to insert all imported contracts into one single file. Useful to verify and/or compare bytecode.

#### Parameters

| name         | type   | description                                                                                                | default |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------- | ------- |
| name         | String | The name of the contract.                                                                                  | -       |
| contractCode | String | The contract code.                                                                                         | -       |
| importFiles  | Array  | The array of contracts to be imported. If you have zeppelin contracts you must install it as a dependency. | -       |

_example:&nbsp;_
```javascript
bytecodeUtils.flatten(
    'BSGTokenCrowdsale',
    fs.readFileSync('./BSGTokenCrowdsale.sol', 'utf8'),
    [{
        name: 'BSGToken',
        code: fs.readFileSync('./BSGToken.sol', 'utf8')
    }]
)
```

#### Returns

**Type:**&nbsp;Solc instance

