## Notarize

### Code

```java
/*
 Bitsign generic notarizacion contract v0.1f
*/
pragma solidity ^0.4.15;


contract Notarize {
  //State variables
  mapping (bytes32 => address) private proofs;
  address private owner;
  address private BSG;

  event Notary(bytes32 _data, address _address);

  /*
    Contract constructor takes _user as client Ethereum address
   */
  function Notarize(address _user) public {
    BSG = msg.sender;
    owner = _user;
  }

  /* @params
    _data data to sign
   */
  function notarize(bytes32 _data) external {
    if (msg.sender != owner && msg.sender != BSG)
      revert();
    proofs[_data] = msg.sender;
    Notary(_data, msg.sender);
  }

  function getProof(bytes32 _data) constant public returns (address) {
    return proofs[_data];
  }
}
```

### Abi
```json
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
        "signature": "0x8dbf688db5c79fe10fee0cf2f31d8bc8fbe532066562899c198aa744173011f6"
      }
```
### Bytecode

```
0x608060405234801561001057600080fd5b5060405160208061021083398101604052516002805433600160a060020a03199182161790915560018054909116600160a060020a039092169190911790556101b28061005e6000396000f30060806040526004361061004b5763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416631b80bb3a8114610050578063cbef362f14610091575b600080fd5b34801561005c57600080fd5b506100686004356100ab565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b34801561009d57600080fd5b506100a96004356100d3565b005b60009081526020819052604090205473ffffffffffffffffffffffffffffffffffffffff1690565b60015473ffffffffffffffffffffffffffffffffffffffff163314801590610113575060025473ffffffffffffffffffffffffffffffffffffffff163314155b1561011d57600080fd5b60008181526020818152604091829020805473ffffffffffffffffffffffffffffffffffffffff19163390811790915582518481529182015281517f8dbf688db5c79fe10fee0cf2f31d8bc8fbe532066562899c198aa744173011f6929181900390910190a1505600a165627a7a72305820c9526cf9c520f8a7c1438955c6b01e9c764aa968380a04eb0b55f14668a6b5020029
```

## Escrow

### Code

```java
/*
 Bitsign escrow contract v0.1
*/
pragma solidity ^0.4.15;


contract Escrow {
  //State variables
  address public buyer;
  address public seller;
  address public arbiter;
  uint public value;
  uint public endTime;
  //Events
  event Payout(uint _value, address _to);
  event Refund(uint _value, address _to);

  modifier validateParams (address _seller, address _buyer) {
    require (_seller != address(0) && _buyer != address(0) && _seller != _buyer);
    _;
  }

  modifier isBuyerOrArbiter () {
    require (msg.sender == buyer || msg.sender == arbiter);
    _;
  }

  modifier isSellerOrArbiter () {
    require (msg.sender == seller || msg.sender == arbiter);
    _;
  }


  modifier isArbiter () {
    require (msg.sender == arbiter);
    _;
  }

  function Escrow (address _seller, address _buyer, uint _endTime) public payable validateParams (_seller, _buyer) {
    arbiter = msg.sender;
    value = msg.value;
    buyer = _buyer;
    seller = _seller;
    endTime = _endTime;
  }


  function pay() external isBuyerOrArbiter() {
    Payout(this.balance, seller);
    seller.transfer(this.balance);
  }


  function refund() external payable isSellerOrArbiter() {
    Refund(this.balance, buyer);
    buyer.transfer(this.balance);
  }

  function getBalance() external constant returns (uint) {
    return this.balance;
  }

  function kill() public payable isArbiter() {
    selfdestruct(msg.sender);
  }
}
```

### Abi
```json
{
    "constant": true,
    "inputs": [],
    "name": "seller",
    "outputs": [
        {
        "name": "",
        "type": "address"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x08551a53"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "getBalance",
    "outputs": [
        {
        "name": "",
        "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x12065fe0"
    },
    {
    "constant": false,
    "inputs": [],
    "name": "pay",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x1b9265b8"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "endTime",
    "outputs": [
        {
        "name": "",
        "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x3197cbb6"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "value",
    "outputs": [
        {
        "name": "",
        "type": "uint256"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x3fa4f245"
    },
    {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0x41c0e1b5"
    },
    {
    "constant": false,
    "inputs": [],
    "name": "refund",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function",
    "signature": "0x590e1ae3"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "buyer",
    "outputs": [
        {
        "name": "",
        "type": "address"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x7150d8ae"
    },
    {
    "constant": true,
    "inputs": [],
    "name": "arbiter",
    "outputs": [
        {
        "name": "",
        "type": "address"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0xfe25e00a"
    },
    {
    "inputs": [
        {
        "name": "_seller",
        "type": "address"
        },
        {
        "name": "_buyer",
        "type": "address"
        },
        {
        "name": "_endTime",
        "type": "uint256"
        }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor",
    "signature": "constructor"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
        },
        {
        "indexed": false,
        "name": "_to",
        "type": "address"
        }
    ],
    "name": "Payout",
    "type": "event",
    "signature": "0x9b5d1a613fa5f0790b36b13103706e31fca06b229d87e9915b29fc20c1d76490"
    },
    {
    "anonymous": false,
    "inputs": [
        {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
        },
        {
        "indexed": false,
        "name": "_to",
        "type": "address"
        }
    ],
    "name": "Refund",
    "type": "event",
    "signature": "0x510b82fea70ff89a8cc73cd7f29db2d7b480134c160cb52a258797b42d1989ad"
    }
```

### Bytecode

```
0x60806040526040516060806104158339810160409081528151602083015191909201518282600160a060020a038216158015906100445750600160a060020a03811615155b8015610062575080600160a060020a031682600160a060020a031614155b151561006d57600080fd5b505060028054600160a060020a031990811633179091553460035560008054600160a060020a0394851690831617905560018054949093169316929092179055600455610356806100bf6000396000f3006080604052600436106100985763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166308551a53811461009d57806312065fe0146100ce5780631b9265b8146100f55780633197cbb61461010c5780633fa4f2451461012157806341c0e1b514610136578063590e1ae31461013e5780637150d8ae14610146578063fe25e00a1461015b575b600080fd5b3480156100a957600080fd5b506100b2610170565b60408051600160a060020a039092168252519081900360200190f35b3480156100da57600080fd5b506100e361017f565b60408051918252519081900360200190f35b34801561010157600080fd5b5061010a610184565b005b34801561011857600080fd5b506100e3610236565b34801561012d57600080fd5b506100e361023c565b61010a610242565b61010a61025c565b34801561015257600080fd5b506100b261030c565b34801561016757600080fd5b506100b261031b565b600154600160a060020a031681565b303190565b600054600160a060020a03163314806101a75750600254600160a060020a031633145b15156101b257600080fd5b6001546040805130318152600160a060020a03909216602083015280517f9b5d1a613fa5f0790b36b13103706e31fca06b229d87e9915b29fc20c1d764909281900390910190a1600154604051600160a060020a0390911690303180156108fc02916000818181858888f19350505050158015610233573d6000803e3d6000fd5b50565b60045481565b60035481565b600254600160a060020a0316331461025957600080fd5b33ff5b600154600160a060020a031633148061027f5750600254600160a060020a031633145b151561028a57600080fd5b6000546040805130318152600160a060020a03909216602083015280517f510b82fea70ff89a8cc73cd7f29db2d7b480134c160cb52a258797b42d1989ad9281900390910190a160008054604051600160a060020a0390911691303180156108fc02929091818181858888f19350505050158015610233573d6000803e3d6000fd5b600054600160a060020a031681565b600254600160a060020a0316815600a165627a7a7230582095812bbd697a767d0c8a3ce33e64613b00a948a8dd18c1ff21c33c66ba87f37d0029
```

## NotarizeTx

### Code

```java
/*
 Bitsign transaction notarizacion contract v0.1c
*/
pragma solidity ^0.4.15;

contract NotarizeTx {

  //State variables
  mapping (bytes32 => bytes32) private proofs;
  address public BSG_NODE;
  struct Tx {
    address buyer;
    address seller;
    bytes32 id;
    string date;
    uint value;
    bytes32 hash;
    string status;
    string shipping;
  }

  Tx _tx;
  event NotaryEvt(bytes32 _hash, bytes32 _id);

  /*
    Contract constructor takes _user as client Ethereum address
   */
  function NotarizeTx(address _buyer, address _seller, bytes32 _id, string _date, uint _value, bytes32 _hash, string _status, string _shipping) public {
    _tx.buyer = _buyer;
    _tx.seller = _seller;
    _tx.id = _id;
    _tx.date = _date;
    _tx.value = _value;
    _tx.hash = _hash;
    _tx.status = _status;
    _tx.shipping = _shipping;
    proofs[_hash] = _id;
    BSG_NODE = msg.sender;
  }
  /**
  *
  *
   */
  function updateStatus(string _status, bytes32 _hash, bytes32 _id) public {
    if (_id != _tx.id)
      revert();

    if (msg.sender == _tx.buyer || msg.sender == BSG_NODE) {
      _tx.status = _status;
      _tx.hash = _hash;
      proofs[_hash] = _id;
      NotaryEvt(_hash, _tx.id);
    } else {
      revert();
    }
  }
  /**
  *
   */
  function updateShipping(string _shipping, bytes32 _hash, bytes32 _id) public {
    if (_id != _tx.id)
      revert();

    if (msg.sender == _tx.buyer || msg.sender == BSG_NODE) {
      _tx.status = _shipping;
      _tx.hash = _hash;
      proofs[_hash] = _tx.id;
      NotaryEvt(_hash, _tx.id);
    } else {
      revert();
    }
  }
}
```

### Abi
```json
[
    {
        "constant": true,
        "inputs": [],
        "name": "BSG_NODE",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x1781dbd8"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_shipping",
            "type": "string"
          },
          {
            "name": "_hash",
            "type": "bytes32"
          },
          {
            "name": "_id",
            "type": "bytes32"
          }
        ],
        "name": "updateShipping",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa2d58fdd"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_status",
            "type": "string"
          },
          {
            "name": "_hash",
            "type": "bytes32"
          },
          {
            "name": "_id",
            "type": "bytes32"
          }
        ],
        "name": "updateStatus",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xecfa1bca"
      },
      {
        "inputs": [
          {
            "name": "_buyer",
            "type": "address"
          },
          {
            "name": "_seller",
            "type": "address"
          },
          {
            "name": "_id",
            "type": "bytes32"
          },
          {
            "name": "_date",
            "type": "string"
          },
          {
            "name": "_value",
            "type": "uint256"
          },
          {
            "name": "_hash",
            "type": "bytes32"
          },
          {
            "name": "_status",
            "type": "string"
          },
          {
            "name": "_shipping",
            "type": "string"
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
            "name": "_hash",
            "type": "bytes32"
          },
          {
            "indexed": false,
            "name": "_id",
            "type": "bytes32"
          }
        ],
        "name": "NotaryEvt",
        "type": "event",
        "signature": "0xe5d5bf8ea78ec03a3dcd460fddcbafc825fc5998cdcc276cbf12186399228bbe"
      }
]
```

### Bytecode

```
000000000000000000000000534cd4e646c9d9981ee94c24a33221abb55f99e700000000000000000000000044751576b07eee07de3d8d5bfb9c8dd77add174408551a5300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000029b5d1a613fa5f0790b36b13103706e31fca06b229d87e9915b29fc20c1d76490000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000006352f352f313800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007736869707065640000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000026867000000000000000000000000000000000000000000000000000000000000
```