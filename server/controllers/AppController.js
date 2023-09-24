exports.homepage = async(req, res) =>{
    try {
        res.render('index', {title: 'Equitycare Global | Home'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}