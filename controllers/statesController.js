const States = require('../model/States');

const getAllStates = async (req,res) => {
    const states = res.states;
    const mongoStates = await States.find({}).exec();
    let merged = [];
    states.forEach(state => {
        stateExists = mongoStates.find(st => st.stateCode === state.code);
        if(stateExists) {
            const funfacts = stateExists.funfacts;
            merged.push({...state, funfacts});
        }else {
            merged.push(state);
        }
    });

    res.json(merged);
}

const getState = async (req, res) => {
    const state = res.state;
    const mongoState = await States.findOne({'stateCode' : state.code}).exec();
    if(mongoState) {
        const funfacts = mongoState.funfacts;
        res.json({...state, funfacts });
    }else {
        res.json(state);
    }
};

const getCapital = (req,res) => {
    const state = res.state.state;
    const capital = res.state.capital_city;
    res.json({ state, capital });
};

const getNickname = (req,res) => {
    const state = res.state.state;
    const nickname = res.state.nickname;
    res.json({ state, nickname });
}

const getPopulation = (req,res) => {
    const state = res.state.state;
    let population = res.state.population;
    population = population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    res.json({ state, population });
}

const getAdmission = (req,res) => {
    const state = res.state.state;
    const admitted = res.state.admission_date;
    res.json({ state, admitted });
}

module.exports = {
    getAllStates,
    getState,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission }