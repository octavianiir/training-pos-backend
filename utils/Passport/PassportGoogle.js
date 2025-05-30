const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const session = require("express-session");
const UserCheckExist = require("../../modules/UserManagement/controllers/Users/scripts/UserCheckExist");
const SignUpPostData = require("../../modules/UserManagement/controllers/SignUp/scripts/SignUpPostData");
const UserGetFullData = require("../../modules/UserManagement/controllers/Users/scripts/UserGetFullData");
const CreateToken = require("../../modules/UserManagement/controllers/Login/scripts/CreateToken");

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/oauth2/redirect/google",
  scope: ["profile", "email", "openid"]
}, async (issuer, profile, cb) => {
  console.log("issuer", issuer);
  console.log("profile", profile);
  let email = profile.emails[0].value;
  let google_id = profile.id;
  let userData = {
    username: email,
    fullname: profile.displayName,
    email: email,
    password: google_id,
    google_id: google_id
  }
  let user = false;
  let token = undefined;
  let userSignup;
  const userExist = await UserCheckExist(null, { google_id: google_id });
  let userFilter = {};
  if (!userExist) {
    userSignup = await SignUpPostData(null, userData);
    userFilter.google_id = google_id;
  } else {
    userFilter.id = userExist.id;
  }
  user = await UserGetFullData(null, userFilter);
  token = await CreateToken(user);
  cb(null, { data: token.data, token: token.token });
}));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    console.log(user);
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  })
})

module.exports = {
  passport_authenticate: passport.authenticate("google"),
  passport_authenticate_redirect: redirect,
  passport_authenticate_session: passport.authenticate("session"),
  session: session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
};

function redirect(req, res, next) {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    // should be redirected to Frontend's url
    // with related parameter, then
    // frontend side should process the parameter
    // and was redirected to the intended page 
    res.json(user);
  })(req, res, next);
}