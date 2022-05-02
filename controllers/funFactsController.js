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
    if (!req?.body?.stateCode || !req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'State code and funfact required' });
    }

    try {
        const result = await States.create({
            stateCode: req.body.stateCode,
            funfacts: req.body.funfacts
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getRandomFact,
    createNewFact
}

