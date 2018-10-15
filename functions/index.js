const functions = require('firebase-functions');
const watson = require('watson-developer-cloud/assistant/v1');
require('dotenv').config();

const cors = require('cors')({origin: true})

const chatbot  = new watson({
    // username: process.env.USERNAME,
    // password: process.env.PASSWORD,
    // version: process.env.VERSION,

    username: '9cfe0c55-d55a-4b99-84fe-4334e139ed15',
    password: 'gxAklRFdqdu1',
    version: '2018-02-16',
});

// const workspace_id = process.env.WORKSPACE_ID;
const workspace_id = 'eaea0d09-8e98-4798-8c8f-330d5b29f187';

// context a primeira vez vem vazio
exports.conversa = functions.https.onRequest((req,res) => {
    cors(req,res, () => {
        let payload = {
            workspace_id,
            context: req.body.context || {},
            input: req.body.input || {}
        };
    
        //chama api do watson passado o payload
        chatbot.message(payload, (err,data) => {
            if(err) {
                return res.status(err.code || 500).json(err)
            }
            return res.json(trataResposta(payload, data))
        })
    })
})

const trataResposta = (payload, resposta) => {
    console.log('watson disse:', resposta.output.text[0])
    return resposta;
}