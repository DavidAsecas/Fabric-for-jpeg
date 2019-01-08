const Fabric_Client = require('fabric-client');
const path = require('path');

let fabric_client = new Fabric_Client();
let user1 = null;
let store_path = path.join(__dirname, '..', 'crypto-config/peerOrganizations/dist.jpeg.com/ca');
const privateKeyPath = path.join(store_path, 'a02ddcf21b3e9e3a292f99e8a8d2dc2c2be137406ed7edf2b92a0eb843642b90_sk');
const signedCertPath = path.join(store_path, 'ca.dist.jpeg.com-cert.pem');

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
        mspid: 'DistMSP',
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