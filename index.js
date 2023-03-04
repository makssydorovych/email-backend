const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Router }= require('express');

const app = express();
app.use(cors());
const port = process.env.PORT || 5001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const login = process.env.LOGIN || 'maksymsydorovych@gmail.com';
const password = process.env.PASSWORD || 'xhkbfmlcphjddddf';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: login,
        pass: password,
    },
});
const router = Router({})
router.get('/', function(req, res){
    res.send('Hello world')
})

router.post('/sendMessage', async function (req, res) {
    const { name, email, message } = req.body;
    const info = await transporter.sendMail({
        from: 'My profile page',
        to: login,
        subject: 'HR WANTS ME',
        html: `<b>Message from portfolio</b>
    <div>
      name: ${name}
    </div>
    <div>
      email: ${email}
    </div>
    <div>
      message: ${message}
    </div>`,

    });
    console.log(res)
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
