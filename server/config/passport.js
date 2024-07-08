let JwtStrategy = require("passport-jwt").Strategy; //JWT驗證
let ExtractJwt = require("passport-jwt").ExtractJwt; //拉出JWT所需要的部分
const User = require("../model").user; //連結user model

module.exports = (passport) => {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = process.env.PASSPORT_SECRET;

  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        let foundUser = await User.findOne({ _id: jwt_payload._id }).exec();
        if (foundUser) {
          done(null, foundUser); //req.user = foundUser
        } else {
          return done(null, false);
        }
      } catch (e) {
        return done(e, false);
      }
    })
  );
};
