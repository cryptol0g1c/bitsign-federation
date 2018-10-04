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

| name         | type    | description                                             | required?                 |
| ------------ | ------- | ------------------------------------------------------- | ------------------------- |
| address      | String  | Address of deployed contract                            | yes                       |
| solcVersion  | String  | Compiler version                                        | no <br> Default: 'latest' |
| contractCode | String  | Code to match with deployed contract                    | yes                       |
| contractName | String  | Name of the deployed contract                           | yes                       |
| optimized    | Numeric | 1 if the contract compilation is optimized, elsewere 0. | no <br> Default: 1        |

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

| name         | type    | description                                             | required?                 |
| ------------ | ------- | ------------------------------------------------------- | ------------------------- |
| solcVersion  | String  | Compiler version                                        | no <br> Default: 'latest' |
| contractCode | String  | Code of the conctract to compile                        | yes                       |
| contractName | String  | Name of the contract.                                   | yes                       |
| optimized    | Numeric | 1 if the contract compilation is optimized, elsewere 0. | Default: 1                |

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

| name    | type   | description                      | required? |
| ------- | ------ | -------------------------------- | --------- |
| address | String | Address of the deployed contract | yes       |

#### Returns
**Type:**&nbsp;String

### getSolcVersion
Return a solc compiler instance from the passed version.

#### Parameters

| name    | type   | description                                    | required? |
| ------- | ------ | ---------------------------------------------- | --------- |
| version | String | Version of the required solc compiler instance | yes       |

#### Returns
**Type:**&nbsp;Solc instance

### processBytecode
Return a solc compiler instance from the passed version.

#### Parameters

| name         | type    | description                                             | required?                 |
| ------------ | ------- | ------------------------------------------------------- | ------------------------- |
| _bytecode | String |  | yes |
| _parameterTypes | Array |  | yes |

#### Returns
**Type:**&nbsp;object

```json
{ 
    "compiled": "0x60..29", //The bytecode set as parameter
    "metadata": "00..29", //Metadata hash
    "swarmHash": "dd792ef406ad68e2d292b0510152c174f8dabdb6969b8e5954062fa16b4d6836" //  
}
```

### flatten
Make usage of truffle-flattener library to insert all imported contracts into one single file. Useful to verify and/or compare bytecode.

#### Parameters
* name - String - The name of the contract.
* contractCode - String - The contract code.
* importFiles - Array - The array of contracts to be imported. If you have zeppelin contracts you must install it as a dependency.

#### Returns
**Type:**&nbsp;Solc instance

#### Usage
```
(async function () {

    await bytecodeUtils.flatten(
        'BSGTokenCrowdsale',
        fs.readFileSync('./BSGTokenCrowdsale.sol', 'utf8'),
        [{
            name: 'BSGToken',
            code: fs.readFileSync('./BSGToken.sol', 'utf8')
        }]
    )
})()
```
