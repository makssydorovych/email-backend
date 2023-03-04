const express = require('express')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
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
app.use(cors());
app.get('/', function(req, res){
    let message = "Hello "
    res.send(message)
})
app.options('/sendMessage', cors());
app.post('/sendMessage', async function (req, res) {
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
