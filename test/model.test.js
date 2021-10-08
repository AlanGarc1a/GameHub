const GameCard = require('../models/gamecard');
const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('GameCard', () => {

    beforeEach((done) => {
        mongoose.connection.collections.gamecards.drop(() => {
            done();
        });
    });

    it('GET /api/games/', async () => {
        const gamecards = [
            { title: 'Call of Duty 4', date: 2007, genre: 'Shooter', summary: '4th installment in the COD franchise', author:"61535b22ec6f8f0dc911370d" },
            { title: 'Call of Duty Black Ops', date: 2010, genre: 'Shooter', summary: 'first installment in the COD Black Ops franchise', author:"61535b22ec6f8f0dc911370d" },
        ]

        await GameCard.insertMany(gamecards);
        const res = await request(app).get("/api/games/");
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(2);
    });

    describe('GET /api/games/:id', () => {
        it('should return a gamecard with the specified id', async () => {
           const game = new GameCard({
               title: 'Resident Evil',
               date: 1999,
               genre: 'Horror',
               summary: 'first game in the resident evil franchise',
               author: '61535b22ec6f8f0dc911370d'
           });
           
           await game.save();
           const res = await request(app).get('/api/games/' + game._id);
           expect(res.status).to.equal(200);
           expect(res.body).to.have.property("title", game.title);
        });

        it('should return a 400 error when an invalid id is pass', async () => {
            const res = await request(app).get('/api/games/1');
            expect(res.status).to.equal(400);
        });

        it('should return a 400 error when a valid is passed but not found', async () => {
            const res = await request(app).get('/api/games/"61550ddc22c6ba06578dbfcd"');
            expect(res.status).to.equal(400);
        })
    });

    describe('POST /api/games/create', () => {
        it('should create a new gamecard', async () => {
            const res = await request(app)
                            .post('/api/games/create')
                            .send({ title: 'Super Mario 64', date: 1996, genre: 'Platformer', body: '3D mario game for the N64', author: '61535b22ec6f8f0dc911370d'});

            expect(res.status).to.equal(200)
        });
    });

    describe("PUT /api/games/update/:id", () => {
        it("should update the existing user and return 200", async() => {
            const game = new GameCard({
                title: "lola",
                date: 2020,
                genre: "Platformer",
                summary: 'new game',
                author: "61535b22ec6f8f0dc911370d"
            });
            await game.save();
    
            const res = await request(app)
                .put("/api/games/update/" + game._id)
                .send({
                    title: "juan"
                });
    
          expect(res.status).to.equal(200);
        });
    });
    
    describe("DELETE /api/games/delete/:id", () => {
        it("should delete requested id and return response 200", async () => {
          const game = new GameCard({
            title: "lola",
            date: 2020,
            genre: "Platformer",
            summary: 'new game',
            author: "61535b22ec6f8f0dc911370d"
          });
          await game.save();
          const gameId = game._id;
          const res = await request(app).delete("/api/games/delete/" + gameId);
          expect(res.status).to.be.equal(200);
        });
    
        it("should return 404 when deleted user is requested", async () => {
          let res = await request(app).get("/api/games/delete/1");
          expect(res.status).to.be.equal(404);
        });
    });
});