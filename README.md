# Bitsign Federation Network

#### Explorer
Bitsign Federation block explorer can be found [here](https://explorer.bitsign.io)

#### Statistics
Statistic explorer can be found [here](https://stats.bitsign.io)

#### Configuration

To connect to Bitsign Federation Blockchain you need to:
Use **genesis.json** settings and initial conditions, this file can be found [here](https://github.com/cryptol0g1c/bitsign-federation/blob/master/genesis.json)

Also public nodes need to be queried to sync Federation blockchain to update to its latest state.
You can use:

##### Public main node:
```
 enode://a891225909f70a4ee3f40c1dac05da763fe0354d5f259922abf841db51706283d2957c09fc7266e5f4633583a34dbef3f38a769eb35551788740a06e387dfa2a@159.203.176.160:30303
```

##### NYC node 2:
```
enode://b21d8b85165319a86c822dadcd51fbaf1aca3fe7854df8644c03ac304e34205d31d44d0eac7dd6366a8f8a621eeb2198d9644090d59771148fb3ac92630d2dd6@198.211.100.127:30303
```

##### Running Parity

Parity software can be downloaded [here](https://github.com/paritytech/parity/releases/tag/v1.7.9) (version 1.7.9 stable required)


##### Command line 

For running Parity on Bitsign Federation an example command line can be:
```
$ parity --chain=genesis.json --bootnodes enode://a891225909f70a4ee3f40c1dac05da763fe0354d5f259922abf841db51706283d2957c09fc7266e5f4633583a34dbef3f38a769eb35551788740a06e387dfa2a@159.203.176.160:30303
```
