let Fabric_Client = require('fabric-client');
let path = require('path');
let fs = require('fs');

let fabric_client = new Fabric_Client();

let serverCert = fs.readFileSync(path.join(__dirname, '..', 'crypto-config/peerOrganizations/dist.jpeg.com/msp/tlscacerts/tlsca.dist.jpeg.com-cert.pem'));
let clientCert = fs.readFileSync(path.join(__dirname, '..', 'crypto-config/peerOrganizations/dist.jpeg.com/users/User1@dist.jpeg.com/tls/client.crt'));
let clientKey = fs.readFileSync(path.join(__dirname, '..', 'crypto-config/peerOrganizations/dist.jpeg.com/users/User1@dist.jpeg.com/tls/client.key'));

let serverCert1 = fs.readFileSync(path.join(__dirname, '..', 'crypto-config/peerOrganizations/buy1.jpeg.com/msp/tlscacerts/tlsca.buy1.jpeg.com-cert.pem'));
let clientCert1 = fs.readFileSync(path.join(__dirname, '..', 'crypto-config/peerOrganizations/buy1.jpeg.com/users/User1@buy1.jpeg.com/tls/client.crt'));
let clientKey1 = fs.readFileSync(path.join(__dirname, '..', 'crypto-config/peerOrganizations/buy1.jpeg.com/users/User1@buy1.jpeg.com/tls/client.key'));

// fabric_client.setTlsClientCertAndKey(Buffer.from(clientCert).toString(), Buffer.from(clientKey).toString());
let channel = fabric_client.newChannel('channel1');
let peer = fabric_client.newPeer('grpcs://localhost:8051', {
    pem: Buffer.from(serverCert1).toString(),
	"ssl-target-name-override": 'peer0.buy1.jpeg.com'
});
channel.addPeer(peer);

var member_user = null;
let store_path = path.join(__dirname, '..', 'crypto-config/peerOrganizations/buy1.jpeg.com/ca');
console.log('Store path:'+store_path);

// create the key value store as defined in the fabric-client/config/default.json 'key-value-store' setting
Fabric_Client.newDefaultKeyValueStore({ path: store_path
}).then((state_store) => {
	// assign the store to the fabric client
	fabric_client.setStateStore(state_store);
	var crypto_suite = Fabric_Client.newCryptoSuite();
	// use the same location for the state store (where the users' certificate are kept)
	// and the crypto store (where the users' keys are kept)
	var crypto_store = Fabric_Client.newCryptoKeyStore({path: store_path});
	crypto_suite.setCryptoKeyStore(crypto_store);
	fabric_client.setCryptoSuite(crypto_suite);

	// get the enrolled user from persistence, this user will sign all requests
	return fabric_client.getUserContext('User1', true);
}).then((user_from_store) => {
	if (user_from_store && user_from_store.isEnrolled()) {
		console.log('Successfully loaded user1 from persistence');
		member_user = user_from_store;
	} else {
		throw new Error('Failed to get user1.... run createUser.js');
    }
    
	const request = {
		chaincodeId: 'jpeg',
		fcn: 'QueryJpegOwner',
		args: ['imagen1']
	};

	// send the query proposal to the peer
	return channel.queryByChaincode(request);
}).then((query_responses) => {
	console.log("Query has completed, checking results");
	// query_responses could have more than one  results if there multiple peers were used as targets
	if (query_responses && query_responses.length == 1) {
		if (query_responses[0] instanceof Error) {
			console.error("error from query = ", query_responses[0]);
		} else {
			console.log("Response is ", query_responses[0].toString());
		}
	} else {
		console.log("No payloads were returned from query");
	}
}).catch((err) => {
	console.error('Failed to query successfully :: ' + err);
});