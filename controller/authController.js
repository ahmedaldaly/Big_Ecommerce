const  User  = require('../module/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const passport = require("passport"); 
const GoogleStrategy = require("passport-google-oauth20").Strategy; 
const nodemailer = require('nodemailer');

passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        callbackURL: "https://big-ecommerce.vercel.app/api/vl/auth/google/callback"
  
  
      },
      async (accessToken, refreshToken, profile, done) => { 
        try {
          let existingUser = await User.findOne({ email: profile.emails[0].value }); 
  
          if (!existingUser) {
            existingUser = new User({
              email: profile.emails[0].value, 
              name: profile.displayName,
              password: "google-auth", 
              image: {
                url: profile.photos[0].value || undefined,
                id: "google"
              }
            });
  
            await existingUser.save(); 
          }
  
       
          const token = Jwt.sign(
            { id: existingUser._id, isAdmin: existingUser.isAdmin },
            process.env.JWT_SECRET || "secret12345", 
            { expiresIn: "7d" } 
          );
  
          existingUser.token = token; 
          await existingUser.save(); 
  
          return done(null, existingUser); 
        } catch (error) {
          return done(error, null); 
        }
      }
    )
  );
  
  
  module.exports.googleAuth = passport.authenticate("google", {
    scope: ["profile", "email"], 
    prompt: "consent", 
  });
  

  module.exports.googleCallback = async (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.redirect("/login");
      }
  
      req.user = user;
      console.log("User authenticated successfully:", req.user);
      res.redirect(`http://localhost:5173/profile?token=${req.user.token}`);
    })(req, res, next);
  };
  
  
  // تسجيل خروج المستخدم
  module.exports.logout = (req, res) => {
    req.logout(() => { 
      res.redirect("/"); 
    });
  };

module.exports.register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const find = await User.findOne({ email: req.body.email });
    if (find) res.status(400).json({ message: 'user already exist' });
    const Hash = await bcrypt.hash(password, 10)
    const newUser = new User({
        name: name,
        email: email,
        password: Hash,
    })
    const user = await newUser.save()
    const token = Jwt.sign(
        {
            id: newUser._id,
            Admin: newUser.isAdmin,
            Trader: newUser.isTrader
        },
        process.env.JWT_SECRET || "secret1234",
        { expiresIn: "7d" }
    );

    user.token = token
    await user.save()
    res.status(201).json(user)

})
module.exports.Login = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;

        const find = await User.findOne({ email: email })
        if (!find) res.status(400).json({ message: 'user not found' });
        const check = await bcrypt.compare(password, find?.password )
        if (!check) res.status(400).json({ message: 'email or password not correct' });

        const token = Jwt.sign(
            {
                id: find?._id,
                Admin: find?.isAdmin,
                Trader: find?.isTrader,
            },
            process.env.JWT_SECRET || "secret1234",
            { expiresIn: '7d' }
        )
        await User.findOneAndUpdate(find?._id,{token:token},{new:true})
        res.status(200).json(find)
    } catch (err) { res.status(500).json(err) }
})

module.exports.sendResetCode = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // مثال: 6 أرقام

  user.resetCode = resetCode;
  user.resetCodeExpires = Date.now() + 15 * 60 * 1000; // صلاحية الكود 15 دقيقة
  await user.save();

  // إرسال الإيميل
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ranaandahmed55@gmail.com',
      pass: process.env.PASSWORD
    }
  });

  await transporter.sendMail({
    from: `"App Support" <ranaandahmed55@gmail.com>`,
    to: email,
    subject: 'رمز إعادة تعيين كلمة المرور',
    html: `
      <p>رمز التحقق الخاص بك هو: <b>${resetCode}</b></p>
      <p>الرمز صالح لمدة 15 دقيقة.</p>
    `
  });

  res.status(200).json({ message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني' });
});

module.exports.verifyResetCode = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.resetCode !== code || Date.now() > user.resetCodeExpires) {
    return res.status(400).json({ message: 'رمز غير صالح أو منتهي' });
  }

  res.status(200).json({ message: 'تم التحقق من الرمز بنجاح' });
});

module.exports.setNewPassword = asyncHandler(async (req, res) => {
  const { email, code, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user || user.resetCode !== code || Date.now() > user.resetCodeExpires) {
    return res.status(400).json({ message: 'رمز غير صالح أو منتهي' });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetCode = null;
  user.resetCodeExpires = null;
  await user.save();

  res.status(200).json({ message: 'تم تغيير كلمة المرور بنجاح' });
});
