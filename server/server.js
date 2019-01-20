let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const query = require('./query')
let cors = require('cors')

app.use(cors())
app.options('*', cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let router = express.Router();

router.post('/newOwner', function (req, res) {
    let config = req.body.config;
    if (req.body.request == "create") {
        let message = geth.createBlockchain(config);
        res.status(200).send({
            message: message
        })
    } else if (req.body.request == "connect") {
        geth.connectToBlockchain(config)
            .then(message => {
                res.status(200).send({
                    message: message
                })
            })
    }
})

router.get('/queryOwner', function (req, res) {
    let channel = req.query.channel;
    let org = req.query.org;
    let image = req.query.image;

    console.log(req.query)
    query.queryToChannel(channel, org, image)
        .then(queryResponse => {
            console.log(queryResponse)
            res.status(200).send({
                queryResponse: queryResponse
            })
        })

})

app.use('/api', router)

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

