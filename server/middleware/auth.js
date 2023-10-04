exports.checkAuth = (req, res, next) => {
    if (req.session.adminId) {
      return res.redirect('/admin/dashboard');
    }
    if (req.session.clientId) {
      return res.redirect('/app/client-profile');
    }
    if (req.session.caregiverId) {
      return res.redirect('/app/caregiver-profile');
    }
    next();
};