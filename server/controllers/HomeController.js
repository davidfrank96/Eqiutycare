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

exports.getstartedpage = async(req, res) =>{
    try {
        res.render('get-started', {title: 'Equitycare Global | Get Started'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}

exports.clientLogin = async(req, res) =>{
    try {
        res.render('client-login', {title: 'Equitycare Global | Login'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}

exports.caregiverLogin = async(req, res) =>{
    try {
        res.render('caregiver-login', {title: 'Equitycare Global | Login'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}

exports.adminLogin = async(req, res) =>{
    try {
        res.render('admin-login', {title: 'Equitycare Global | Login'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}

exports.caregiverOtp = async(req, res) =>{
    try {
        res.render('caregiver-otp', {title: 'Equitycare Global | Verify OTP'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}

exports.clientOtp = async(req, res) =>{
    try {
        res.render('client-otp', {title: 'Equitycare Global | Verify OTP'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}

exports.adminOtp = async(req, res) =>{
    try {
        res.render('admin-otp', {title: 'Equitycare Global | Verify OTP'});
    } catch (error) {
        res.status(500).send({message: error.message || "Error occured"});
    }
}