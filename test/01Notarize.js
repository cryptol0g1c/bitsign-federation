'use strict';

const Notarize = artifacts.require('Notarize');

contract ('Notarize', function(accounts)){
	let Notarize;
	const Acc = accounts [0];
	const Other = accounts [1];

	beforeEach(async function () {
		Notarize = await Notarize.new();
	});

	it ("should put 1000 NOtarize in the first account") async function (){
		let Notarize = await Notarize.deployed();
		let balance = await Notarize.getBalance.call(accounts[0]);
		assert.equal(balance.valueOf(),1000, "1000 wasn't in the first account")
	}
});






