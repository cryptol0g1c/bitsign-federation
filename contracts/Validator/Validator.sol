pragma solidity 0.4.25;

contract Validator {
  address[] private _validatorArr;
  address[] private _pendingArr = [0x0a0F29a9B479d91F6D112B203C7D9dB0cb4CDb84, 0x31ad95aff37d2079eae45826c928a63d1fa5f05f, 0xb76954c02d7c3bef7f3470fc80d054a847cab644];
  bool private _finalized = true;

  event InitiateChange(bytes32 indexed _parent_hash, address[] _new_set);
  event ChangeFinalized(address[] current_set);

  modifier finalized {
    require(_finalized);
    _;
  }
  /**
    Function modifier that let's add or remove validator based on current msg.sender status
   */
  modifier isValidator {
    bool found = false;
    for (uint i = 0; i < _validatorArr.length; i++) {
      if (_validatorArr[i] == msg.sender)
        found = true;
    }
    if (!found)
      revert();
    _;
  }

  constructor() public {
    _validatorArr = _pendingArr;
  }

  // Called on every block to update node validator list.
  function getValidators() public view returns (address[]) {
    return _validatorArr;
  }

  // Expand the list of validators.
  function addValidator(address newValidator) public finalized isValidator {
    _pendingArr.push(newValidator);
    initiateChange();
  }

  // Remove a validator from the list.
  function removeValidator(address validator) public finalized isValidator {
    for (uint i = 0; i < _pendingArr.length; i++) {
      if (_pendingArr[i] == validator) {
        for (uint j = i; j < _pendingArr.length - 1; j++) {
            _pendingArr[j] = _pendingArr[j + 1];
        }
        delete _pendingArr[_pendingArr.length - 1];
        _pendingArr.length--;
        initiateChange();
      }
    }
  }

  function initiateChange() private {
    _finalized = false;
    emit InitiateChange(blockhash(block.number - 1), _pendingArr);
  }

  function finalizeChange() public {
    _validatorArr = _pendingArr;
    _finalized = true;
    emit ChangeFinalized(_validatorArr);
  }
}
