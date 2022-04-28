const getAllStates = (req,res) => {
    res.json(res.states);
}

const getState = (req, res) => {
    const state = res.state;
    res.json({state});
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

// number doesn't contain commas
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