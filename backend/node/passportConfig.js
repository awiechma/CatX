// passportConfig.js
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const db = require('./db'); // Import the PostgreSQL connection pool
require('dotenv').config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
        try {
            console.log(jwt_payload)
            // Query the database to find the user by the ID in the JWT payload
            const result = await db.query('SELECT * FROM users WHERE user_id = $1', [jwt_payload.userId]);
            const user = result.rows[0];

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            return done(error, false);
        }
    })
);

module.exports = passport;
