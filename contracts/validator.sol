pragma solidity ^0.4.13;

contract Validator {
  address[] private _validatorArr;
	address[] private _pendingArr = [0x0a0f29a9b479d91f6d112b203c7d9db0cb4cdb84];
	bool private _finalized = true;

  event InitiateChange(bytes32 indexed _parent_hash, address[] _new_set);
  event ChangeFinalized(address[] current_set);

  modifier finalized {
    require(_finalized);
    _;
  }

	function Validator() {
		_validatorArr = _pendingArr;
	}

	// Called on every block to update node validator list.
  function getValidators() constant returns (address[]) {
		return _validatorArr;
	}

	// Expand the list of validators.
	function addValidator(address newValidator) finalized {
    _pendingArr.push(newValidator);
    initiateChange();
  }

	// Remove a validator from the list.
  function removeValidator(address validator) finalized {
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
    InitiateChange(block.blockhash(block.number - 1), _pendingArr);
  }

	function finalizeChange() {
    _validatorArr = _pendingArr;
    _finalized = true;
    ChangeFinalized(_validatorArr);
  }
}
