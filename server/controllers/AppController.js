exports.homepage = async(req, res) =>{
    try {
        res.render('index', {title: 'Equitycare Global | Home'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}

exports.aboutpage = async(req, res) =>{
    try {
        res.render('about', {title: 'Equitycare Global | About'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}