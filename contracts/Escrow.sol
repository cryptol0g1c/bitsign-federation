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

  /**
    TODO: doc
   */
  function Escrow (address _seller, address _buyer, uint _endTime) public payable validateParams (_seller, _buyer) {
    arbiter = msg.sender;
    value = msg.value;
    buyer = _buyer;
    seller = _seller;
    endTime = _endTime;
  }

  /**
    TODO: Si las condiciones del contrato se cumplen, el arbiter o comprador puede ejecutar
    esta función para pagar al vendedor.
   */
  function pay() external isBuyerOrArbiter() {
    Payout(this.balance, seller);
    seller.transfer(this.balance);
  }

  /**
    TODO: Si las condiciones no se cumplen por algún motivo, se ejecuta
    esta función para devolver al comprador los fondos.
   */
  function refund() external isSellerOrArbiter() {
    Refund(this.balance, buyer);
    buyer.transfer(this.balance);
  }

  /**
    TODO: Devuelve el balance depositando en el contrato
  */
  function getBalance() external constant returns (uint) {
    return this.balance;
  }

  /**
    TODO: doc
  */
  function kill() public isArbiter() {
    selfdestruct(msg.sender);
  }
}
