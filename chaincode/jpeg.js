const shim = require('fabric-shim');
const util = require('util');

const Chaincode = class {
    async Init(stub) {
        return shim.success(Buffer.from('Initialized Successfully!'));
    }

    async Invoke(stub) {
        console.info('Transaction ID: ' + stub.getTxID());
        console.info(util.format('Args: %j', stub.getArgs()));

        let ret = stub.getFunctionAndParameters();
        let params = ret.params;
        let fn = ret.fcn;
        // use the invoke input arguments to decide intended changes
        console.info('Calling function: ' + fn);

        if (fn === 'NewOwner') {
            let result = await NewJpegOwner(stub, params);
            if (result)
                return shim.success(Buffer.from('Success!'))
        } else if (fn === 'QueryOwner') {
            let result = await QueryJpegOwner(stub, params);
            if (result)
                return shim.success(Buffer.from(result.toString()))
        }
    }

    async NewJpegOwner(stub, args) {
        let image = args[0];
        let owner = args[1];
        try {
            return await stub.putState(image, Buffer.from(owner));
        } catch (e) {
            return shim.error(e);
        }
    }

    async QueryJpegOwner(stub, args) {
        let image = args[0];
        try {
            return await stub.getState(image);
        } catch (e) {
            return shim.error(e);
        }
    }
};

shim.start(new Chaincode());