const mongoose = require('mongoose');
const Survey = mongoose.model('surveys');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

module.exports = (app) => {
    app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
        const { title, body, subject, recipients } = req.body;
        const survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients
                .split(',')
                .map((email) => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        //send an email
        const email = new Mailer(survey, surveyTemplate(survey));
    });
};
