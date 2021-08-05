var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
var body_parser = require("body-parser");
const { pugEngine } = require("nodemailer-pug-engine");
/* GET users listing. */
router.get('/', function(req, res, next) {
  if (req.body.config) {
    var config = req.body.config;
    var from = req.body.from;
    var to = req.body.to;
    var form = req.body.form;
    var mailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.email,
        pass: config.appPass,
      },
    });

    mailer.use(
      "compile",
      pugEngine({
        templateDir: __dirname + "/views",
        pretty: true,
      })
    );

    mailer.sendMail({
      to: config.email,
      template: `${config.appName}/${config.form}`, 
      subject: `${config.subject}`,
      from:`${to.name}`,
      ctx: form ,
    });

    res.json({"message":"email enviado"});
  } else {
    res.json({ message: "falta la configuracion" });
  }
});

module.exports = router;