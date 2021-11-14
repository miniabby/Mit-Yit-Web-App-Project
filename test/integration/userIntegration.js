const expect = require('chai').expect;
const sinon = require('sinon');
const supertest = require('supertest');
var User = require('../../models/Users.js');
const app = require('../../app')

describe('userController integartion test', () => {
    const sandbox = sinon.createSandbox();
        after(async () => {
            sandbox.reset();
        })
        

    //integration test on signup function
    it('valid user signup---integration', async () => {        
        const user = {
                username: 'name',
                email: 'email@gmail.com',
                password: 'password',
                password2: 'password',
                gender: 'Female',
                dietary: {
                    cuisine: {
                        first: '',
                        second: '',
                        third: ''
                    },
                    religion: '',
                    allergy: '',
                },
                additional: {
                    academic: {
                        major: '',
                        level: ''
                    },
                    hobbies: '',
                    career: '',
                },
                availability: {
                    lunch:'',
                    dinner:'',
                    coffee:''
                },
                request:'',
                history:'',
                review: ''
        };
        sandbox.replace(User.prototype, 'save', function () {
            return Promise.resolve();
        })
        const res = await supertest(app).post('/user/signup').send(user);
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('text/html');
        expect('Location','/login')
    })

    it('invalie user signup--integration', async () => {
        const user = {
            username: '',
            email: 'email@gmail.com',
            password: 'password',
            password2: 'password',
            gender: 'Female',
            dietary: {
                cuisine: {
                    first: '',
                    second: '',
                    third: ''
                },
                religion: '',
                allergy: '',
            },
            additional: {
                academic: {
                    major: '',
                    level: ''
                },
                hobbies: '',
                career: '',
            },
            availability: {
                lunch:'',
                dinner:'',
                coffee:''
            },
            request:'',
            history:'',
            review: ''
    };
        const res = await supertest(app).post('/user/signup').send(user);
        expect(res.redirect).to.equal(false);
        expect('Location','/signup')
        expect(res.type).to.equal('text/html');
    })

    //integration test on login function
    it('invalid user login---integration', async () => {
        const user = {
                username: 'name',
                password: 'password',
        };
        const res = await supertest(app).post('/user/login').send(user);
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('text/html');
        expect('Location','/login')
    })

    it('valid user login---integration', async () => {
        const user = {
                username: 'Abigail',
                password: 'qwqwqw',
        };
        const res = await supertest(app).post('/user/login').send(user);
        expect(res.type).to.equal('text/plain');
        expect('Location','/home')
    })
})