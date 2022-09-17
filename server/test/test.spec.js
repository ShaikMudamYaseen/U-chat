const chai=require('chai')
const server=require('../server')
const chaiHttp=require('chai-http')
const fs=require('fs');

const { expect } = require('chai');
const path = require('path');
chai.should();
chai.expect()
chai.use(chaiHttp)

describe("Backend Testing",()=>{
    describe("TestCases for signUp route",()=>{
        it("Giving all valid data",(done)=>{
            chai.request(server.app)
            .post("/signup")
            .set("Content-Type",'multipart/form-data')
            .field({
                userName:"mudamyaseen1",
                fullName:"mudamyaseen",
                email:"fjuh@gmail.com",
                mobileNo:"1234567895",
                password:"qwerty"
            })
            .attach("profile",path.join(__dirname,"logo.png"),"logo.png")
            .end(async(err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property('status')
                res.body.should.have.property('message')
                res.body.should.have.property('token')
                expect(res.body.message).to.equals("registration successful")
                expect(res.body.status).to.equals("success")

                expect(res.body.user.userName).to.equals("mudamyaseen1")
                expect(res.body.user.fullName).to.equals("mudamyaseen")
                expect(res.body.user.email).to.equals("fjuh@gmail.com")
                expect(res.body.user.mobileNo).to.equals("1234567895")
                done()
            })
        }).timeout(10000)
        it("Giving already register userName",(done)=>{
            chai.request(server.app)
            .post("/signup")
            .set("Content-Type",'multipart/form-data')
            .field({
                userName:"mudamyaseen1",
                fullName:"mudamyaseen",
                email:"fjuh@gmail.com",
                mobileNo:"1234567895",
                password:"qwerty"
            })
            .attach("profile",path.join(__dirname,"logo.png"),"logo.png")
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property('status')
                res.body.should.have.property('message')
                expect(res.body.message).to.equals(`mudamyaseen1 already in use`)
                expect(res.body.status).to.equals("failed")
                done()
            })
        }).timeout(10000)
        it("Giving already register email",(done)=>{
            chai.request(server.app)
            .post("/signup")
            .set("Content-Type",'multipart/form-data')
            .field({
                userName:"mudamyaseen2",
                fullName:"mudamyaseen",
                email:"fjuh@gmail.com",
                mobileNo:"1234567895",
                password:"qwerty"
            })
            .attach("profile",path.join(__dirname,"logo.png"),"logo.png")
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property('status')
                res.body.should.have.property('message')
                expect(res.body.message).to.equals(`fjuh@gmail.com already in use`)
                expect(res.body.status).to.equals("failed")
                done()
            })
        }).timeout(10000)
        it("Giving invalid email domine",(done)=>{
            chai.request(server.app)
            .post("/signup")
            .set("Content-Type",'multipart/form-data')
            .field({
                userName:"mudamyaseen2",
                fullName:"mudamyaseen",
                email:"fjuh@gmail.com1",
                mobileNo:"1234567895",
                password:"qwerty"
            })
            .attach("profile",path.join(__dirname,"logo.png"),"logo.png")
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property('status')
                res.body.should.have.property('message')
                expect(res.body.message).to.equals(` Please enter a valid email`)
                expect(res.body.status).to.equals("failed")
                done()
            })
        }).timeout(10000)
        it("Givinga already register mobileNo",(done)=>{
            chai.request(server.app)
            .post("/signup")
            .set("Content-Type",'multipart/form-data')
            .field({
                userName:"mudamyaseen4",
                fullName:"mudamyaseen",
                email:"fjuhqw@gmail.com",
                mobileNo:"1234567895",
                password:"qwerty"
            })
            .attach("profile",path.join(__dirname,"logo.png"),"logo.png")
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property('status')
                res.body.should.have.property('message')
                expect(res.body.message).to.equals(`1234567895 already in use`)
                expect(res.body.status).to.equals("failed")
                done()
            })
        }).timeout(10000)
        it("Givinga 15 digit mobileNo",(done)=>{
            chai.request(server.app)
            .post("/signup")
            .set("Content-Type",'multipart/form-data')
            .field({
                userName:"mudamyaseen4",
                fullName:"mudamyaseen",
                email:"fjuhqw@gmail.com",
                mobileNo:"123456789567656",
                password:"qwerty"
            })
            .attach("profile",path.join(__dirname,"logo.png"),"logo.png")
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property('status')
                res.body.should.have.property('message')
                // expect(res.body.message).to.equals(``)
                expect(res.body.message).to.equals(" Path `mobileNo` (`123456789567656`) is longer than the maximum allowed length (10).")
                expect(res.body.status).to.equals("failed")
                done()
            })
        }).timeout(10000)


    })
    var jwtToken
    describe("TestCases for signIn route",()=>{
        it("Giving the valid data",()=>{
            chai.request(server.app)
            .post("/login")
            .send({
                username:"yaseen1",
                password:"qwerty"
            })
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.a("object")
                res.body.should.have.property('status')
                res.body.should.have.property('message')
                res.body.should.have.property('token')
                expect(res.body.status).to.equals("success")
                // expect(res.body.token).to.equals("success")


               global.jwtToken=res.body.token
                done()
            })
            



        })
        
    })
})