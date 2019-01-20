const Fabric_Client = require('fabric-client');
const path = require('path');

let fabric_client = new Fabric_Client();
let user1 = null;
let store_path = path.join(__dirname, '..', 'crypto-config/peerOrganizations/buy1.jpeg.com/ca');
const privateKeyPath = path.join(__dirname, '..', 'crypto-config/peerOrganizations/buy1.jpeg.com/users/User1@buy1.jpeg.com/msp/keystore/81ad52a9ed4e5af1401ec5903a62736c1e90a74840f9631d0e8a00c453224b1f_sk');
const signedCertPath = path.join(__dirname, '..', 'crypto-config/peerOrganizations/buy1.jpeg.com/users/User1@buy1.jpeg.com/msp/signcerts/User1@buy1.jpeg.com-cert.pem');

Fabric_Client.newDefaultKeyValueStore({
    path: store_path
}).then((state_store) => {
    // assign the store to the fabric client
    fabric_client.setStateStore(state_store);
    var crypto_suite = Fabric_Client.newCryptoSuite();
    // use the same location for the state store (where the users' certificate are kept)
    // and the crypto store (where the users' keys are kept)
    var crypto_store = Fabric_Client.newCryptoKeyStore({ path: store_path });
    crypto_suite.setCryptoKeyStore(crypto_store);
    fabric_client.setCryptoSuite(crypto_suite);
    var tlsOptions = {
        trustedRoots: [],
        verify: false
    }
    return fabric_client.createUser({
        username: 'User1',
        mspid: 'Buy1MSP',
        cryptoContent: {
            privateKey: privateKeyPath,
            signedCert: signedCertPath
        }
    })
}).then(user => {
    user1 = user;
    return fabric_client.setUserContext(user);
}).then(() => {
    console.log('User1 se ha registrado correctamente y esta preparado para interactuar con Fabric')
}).catch(err => {
    console.error('Failed to register: ' + err);
    if (err.toString().indexOf('Authorization') > -1) {
        console.error('Authorization failures may be caused by having admin credentials from a previous CA instance.\n' +
            'Try again after deleting the contents of the store directory ' + store_path);
    }
});