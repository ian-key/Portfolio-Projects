const checkMillionDollarIdea = (req, res, next) => {
    const idea = req.body
    if (!idea.numWeeks || !idea.weeklyRevenue || !idea) {
        res.status(400).send('Data is missing from your diea')
    } else {
    const ideaValue = (idea.numWeeks * idea.weeklyRevenue);
    if (ideaValue >= 1000000) {
        next();
    } else {
        res.status(400).send('Idea is not a million dollar idea.')
    }
}
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
