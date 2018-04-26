const NotarizeTx = artifacts.require('NotarizeTx');

contract('NoterizeTx', addresses => {
  let instance;

  const bsgNode = addresses[0]
  const buyer = addresses[1];
  const seller = addresses[2];

  const id = '0x7dcb9dc898f40000000000000000000000000000000000000000000000000000';
  const date = Date.now();
  const value = 10;
  const hash = '0x3759835380000000000000000000000000000000000000000000000000000000';
  const status = 'status';
  const shipping = 'shipping';

  beforeEach(async() => {
    instance = (await NotarizeTx.new(buyer, seller, id, date, value, hash, status, shipping, {from: bsgNode})).contract;
  });

  it('should not update the notarize status if sender is not the buyer or bsg_node', async() => {
    try {
      await instance.updateStatus('status', hash, id, {from: seller});
      assert.ok(false, 'It should have failed because a seller cannot update a status.');
    } catch(error) {
      assert(error.message.search("revert"));
    }
  });

  it('should not update the notarize shipping if sender is not the buyer or bsg_node', async() => {
    try {
      await instance.updateShipping('status', hash, id, {from: seller});
      assert.ok(false, 'It should have failed because a seller cannot update a shipping.');
    } catch(error) {
      assert(error.message.search("revert"));
    }
  });

});

