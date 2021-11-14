const sinon = require('sinon');
const expect = require('chai').expect;
var request = require('supertest');
var User = require('../../models/Users.js');
const userController = require("../../controllers/userController.js");

//unit test for userController
describe('controllers unit test', () => {
    const sandbox = sinon.createSandbox();
    after(async () => {
        sandbox.reset();
    })

    //test cases for signup function
    it("signup---new user signup", async () => {
        const spy = sinon.spy();
        const req = {
            body:{
                username: 'name',
                email: 'email@gmail.com',
                password: 'password',
                password2: 'password',
                gender: 'Female',
            }
        };
        const res = {
            render: spy
        };

        sandbox.replace(User.prototype, 'save', function () {
            return Promise.resolve();
        })

        await userController.signup(req, res);
        expect('Location','/login')
    })

    it("signup--invalid user signup", async () => {
        const spy = sinon.spy();
        const req = {
            body:{
                username: '',
                email: 'email@gmail.com',
                password: 'password',
                password2: 'password',
                gender: 'Female',
            }
        };
        const res = {
            render: spy
        };

        await userController.signup(req, res);
        expect('Location','/signup')
    })

    //test case for login function
    it("login--invalid user login", async () => {
        const spy = sinon.spy();
        const req = {
            body:{
                username: 'name',
                password: 'password',
            }
        };
        const res = {
            render: spy
        };
        await userController.login(req, res);
        expect('Location','/login')
    })

    it("login--valid user login", async () => {
        const spy = sinon.spy();
        const req = {
            body:{
                username: 'Abigail',
                password: 'qwqwqw',
            }
        };
        const res = {
            render: spy
        };
        await userController.login(req, res);
        expect('Location','/home')
    })
    
})