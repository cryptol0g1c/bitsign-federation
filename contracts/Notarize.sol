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
