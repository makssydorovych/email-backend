import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'maksymsydorovych@gmail.com',
        pass: 'Pomaranch1+',
    },
});

app.post('/sendMessage', async function (req, res) {
    const { name, email, message } = req.body;

    const info = await transporter.sendMail({
        from: 'My profile page', // sender address
        to: 'maksymsydorovych@gmail.com', // list of receivers
        subject: 'HR WANTS ME', // Subject line
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

    res.send(req.body);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
