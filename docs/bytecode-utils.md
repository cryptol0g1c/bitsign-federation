# bytecode-utils

### This library is meant to be useful for developers that work over ethereum to help them to verify contracts.

### How to use?

``` js
const bytecodeUtils = require('bytecode-utils');
const utils = bytecodeUtils.init(<http_provider>);
```

### Methods

### compareBytecode
This method check if a deployed contract match bytecode to a contract passed by parameter.

#### Parameters
* address - String
* solcVersion - String - Default: 'latest'
* contractCode - String
* contractName - String
* optimized - Numeric - Default: 1

#### Returns
Type: JSON

```js
{
  match: true,
  msg: 'bytecode and metadata match exactly'
}
```

### compile
This method compiles a contract and process the output for later usage.

#### Parameters
* solcVersion - String - Default: 'latest'
* contractCode - String
* contractName - String
* optimized - Numeric - Default: 1

#### Returns
Type: JSON

```js
{
 assembly: '', //compiled assembly
 bytecode: {
  deployed: '', // compiled bytecode
  runtime: '', // compiled runtime bytecode,
  functional: '', // compiled functional bytecode
 },
 auxdata: '', // aux data
 abi: '', // ABI
 opcodes: '', // opcodes
 metadata: '', // metadata
 swarm: '', // swarm
}
```

### getContractCode
Return the contract bytecode from a deployed contract.

#### Parameters
* address - String

#### Returns
Type: String

### getSolcVersion
Return a solc compiler instance from the passed version.

#### Parameters
* version - String

#### Returns
Type: Solc instance

### processBytecode
Return a solc compiler instance from the passed version.

#### Parameters
* _bytecode - String
* _parameterTypes - Array

#### Returns
Type: object

### flatten
Make usage of truffle-flattener library to insert all imported contracts into one single file. Useful to verify and/or compare bytecode.

#### Parameters
* name - String - The name of the contract.
* contractCode - String - The contract code.
* importFiles - Array - The array of contracts to be imported. If you have zeppelin contracts you must install it as a dependency.

#### Returns
Type: Solc instance

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
