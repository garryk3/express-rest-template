import passport from 'passport';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

const user = {
    username: 'test-user',
    password: 'my-password',
    id: 1
};

passport.use(new LocalStrategy(
    function(username, password, done) {
        findUser(username, function (err, user) {
            if (err) {
                return done(err)
            }
            if (!user) {
                return done(null, false)
            }
            if (password !== user.password ) {
                return done(null, false)
            }
            return done(null, user)
        })
    }
))