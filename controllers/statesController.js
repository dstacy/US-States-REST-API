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
/*
const createFunfact = async (req,res) => {
        if (!req?.body?.stateCode || !req?.body?.funfacts) {
            return res.status(400).json({ 'message': 'State Code and funfacts are required' });
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

const updateEmployee = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const employee = await Employee.findOne({ _id: req.body.id }).exec();
    if (!employee) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) employee.firstname = req.body.firstname;
    if (req.body?.lastname) employee.lastname = req.body.lastname;
    const result = await employee.save();
    res.json(result);
}
*/

module.exports = {
    getAllStates,
    getState,
    getCapital,
    getNickname,
    getPopulation,
    getAdmission }