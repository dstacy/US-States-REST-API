const States = require('../model/States');

const getRandomFact = async (req, res) => {
    const result = await States.findOne({stateCode: res.state.code}, 'funfacts').exec();
    if(!result) {
        return res.status(404).json({ "message": `No Fun Facts found for ${res.state.state}` });
    }
    const factArray = result.funfacts;
    const funfact = factArray[Math.floor(Math.random()*factArray.length)]
    res.json({funfact});
}

const createNewFact = async (req, res) => {
    if (!req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'State fun facts value required' });
    }else if(!Array.isArray(req.body.funfacts)) {
        return res.status(400).json({ 'message': 'State fun facts value must be an array' });
    }else 
        try {
                const result = await States.findOneAndUpdate(
                    {stateCode: res.state.code},
                    {$push: { funfacts: req.body.funfacts }},
                    {upsert: true}
                );
        
            res.status(201).json(result);
        } catch (err) {
            console.error(err);
        }
}



module.exports = {
    getRandomFact,
    createNewFact
}