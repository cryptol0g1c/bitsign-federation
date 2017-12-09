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

  /**
    TODO: doc
   */
  function Escrow (address _seller, address _buyer, uint _endtime) payable {
    arbiter = msg.sender;
    value = msg.value;
    buyer = _buyer;
    seller = _seller;
    endTime = _endtime;
  }

  /**
    TODO: Si las condiciones del contrato se cumplen, el arbiter o comprador puede ejecutar 
    esta función para pagar al vendedor.
   */
  function pay() {
    if (msg.sender == buyer || msg.sender == arbiter) {
      Payout(this.balance, seller);
      seller.transfer(this.balance);
    }
  }

  /**
    TODO: Si las condiciones no se cumplen por algún motivo, se ejecuta 
    esta función para devolver al comprador los fondos.
   */
  function refund() {
    if (msg.sender == seller || msg.sender == arbiter) {
      Refund(this.balance, buyer);
      buyer.transfer(this.balance);
    }
  }
  /**
    TODO: Devuelve el balance depositando en el contrato
   */
  function getBalance() constant returns (uint) {
    return this.balance;
  }

  /**
    TODO: doc
   */
  function kill() public {
    if (msg.sender == arbiter)
		  selfdestruct(msg.sender);
	}
}
