const data = {
    states: require('../model/states.json'),
    setStates: function (data) { this.states = data}
}

const verifyContig = (req, res, next) => {
    const contig = req.query.contig;
    if(contig === 'true') {
        console.log("true");
        const states = data.states.filter(state => state.code !== 'AK' && state.code !== 'HI');
        res.states = states;
    } else if(contig === 'false') {
        console.log("false");
        const states = data.states.filter(state => state.code === 'AK' || state.code === 'HI');
        res.states = states;
    } else {
        res.states = data.states;
    }

    next();
}

module.exports = verifyContig
