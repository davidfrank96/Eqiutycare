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

exports.servicespage = async(req, res) =>{
    try {
        res.render('services', {title: 'Equitycare Global | Services'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}

exports.faqpage = async(req, res) =>{
    try {
        res.render('faq', {title: 'Equitycare Global | FAQ'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}

exports.contactpage = async(req, res) =>{
    try {
        res.render('contact', {title: 'Equitycare Global | Contact'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}

exports.ratepage = async(req, res) =>{
    try {
        res.render('our-rates', {title: 'Equitycare Global | Our Rates'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}