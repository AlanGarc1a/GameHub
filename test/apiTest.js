const request = require('supertest');
const app = require('../app');

/**
 * Two categories for tests: 
 *  -Happy Path : expected use cases of our application
 *  -Sad Path : unexpected or invalid use of our application
 */

//======================= gamecard API test ========================

/**
 * Testing the Gamecard API
*/
describe('GameCard API', () => {

    /**
     * Testing the index endpoint
     */
    it('should respond with a list of all gamecards', (done) => {
        request(app)
            .get('/api/games')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    /**
     * Testing the create endpoint
     it('should respond with game created', (done) => {
         let data = {
             "title": "Crash Bandicoot",
             "date": "2015",
             "genre": "Arcade",
             "body": "dfsfsdfsdfsdfsdf",
             "author": "60df50da9b09e10a54e8630c",
         };
         request(app)
             .post('/api/games/create')
             .send(data)
             .set('Accept', 'application/json')
             .expect('Content-Type', /json/)
             .expect(200)
             .end((error) => {
                 if(error) return done(error);
                 done();
             });
     });
     */

    /**
     * Testing error when game create fails
     */
    it('should respond with game create error', (done) => {
        let data = {
            "date": "2015",
            "genre": "Arcade",
            "body": "dfsfsdfsdfsdfsdf",
            "author": "60df50da9b09e10a54e8630c",
        };
        request(app)
            .post('/api/games/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((error) => {
                if(error) return done(error);
                done();
            });
    });

    /**
     * testing if the game already exists in the db
     */
    it('shoud return game already exists and a 302 code', (done) => {
        let data = {
            "title": "Crash Bandicoot 4",
            "date": "2020",
            "genre": "Platformer",
            "body": "dfsfsdfsdfsdfsdf",
            "author": "60df50da9b09e10a54e8630c",
        }
        request(app)
            .post('/api/games/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(302)
            .expect({ message: "Game already exists" })
            .end((err) => {
                if(err) return done(err);
                done();
            });
    });

    /**
     * Testing the get one gamecard enpoint
     */
    it('should return the gamecard with the specified id', (done) => {
        request(app)
            .get('/api/games/60e4d934be1f432d2c0dcb0a')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    /**
     * Testing for a non-existing gamecard
     */
    it('should return an error for a non-existing gamecard', (done) => {
        request(app)
            .get('/api/games/60fb4731ed22da228f82c342')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400) 
            .expect({ message: "No Game Found"})
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    /**
     * Testing the update gamecard endpoint
     */
    it('should return the updated version of the gamecard', (done) => {
        let data = {
            "title": "COD Warzone",
            "date": "2020",
            "genre": "Shooter",
            "summary": "Worse battle royale without a anticheat system",
            "author": "60df48546dcc1b2a58c48905"
        };
        request(app)
            .put('/api/games/update/60e5f2153030c92e006c501d')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if(err) return done(err);
                done();
            });
    });

    /**
     * Testing the delete route
     */
    it('should delete the game with the specified id', (done) => {
        let data = {
            "title": "COD Warzone",
            "date": "2020",
            "genre": "Shooter",
            "summary": "Worse battle royale without a anticheat system",
            "author": "60df48546dcc1b2a58c48905"
        };
        request(app)
        .delete('/api/games/delete/60e5f2153030c92e006c501d')
        .send(data)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .expect('Game was deleted')
        .end((err) => {
            if(err) return done(err);
            done();
        });
    });
});