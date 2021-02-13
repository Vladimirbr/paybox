import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.should();
chai.use(chaiHttp);

const serverUrl = "http://localhost:3000";

let token = "";
const data = {
  key: "ab2",
  value: { b: 1, c: 3 },
};

/* Test the /GET route */
describe("app get index route - server running check", () => {
  it("it should GET / - should return status 200", (done) => {
    chai
      .request(serverUrl)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("it should handle 404 error", (done) => {
    chai
      .request(serverUrl)
      .get("/notExist")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

describe("auth service", () => {
  const urlAuth = serverUrl + "/api/v1/auth";
  const username = Math.random().toString(36).substring(7);
  const password = Math.random().toString(36).substring(7);

  describe("auth routes regester", () => {
    it("it should return status 500 because of empty body", (done) => {
      chai
        .request(urlAuth)
        .post("/register")
        .send({})
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe("auth routes regester", () => {
    it("it should return status 500 because of empty username", (done) => {
      chai
        .request(urlAuth)
        .post("/register")
        .send({
          username: "",
          password: password,
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  describe("auth routes regester", () => {
    it("it should status 500 because of empty password", (done) => {
      chai
        .request(urlAuth)
        .post("/register")
        .send({
          username: username,
          password: "",
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
  describe("auth routes regester", () => {
    it("it should return 200", (done) => {
      chai
        .request(urlAuth)
        .post("/register")
        .send({
          username: username,
          password: password,
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("message");
          res.body.message.should.be.equal("User registrated successfully");
          done();
        });
    });
  });
  describe("auth routes regester", () => {
    it("it should return 500, try registred twise", (done) => {
      chai
        .request(urlAuth)
        .post("/register")
        .send({
          username: username,
          password: password,
        })
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });

  describe("auth routes login", () => {
    it("it should return 400 - username empty", (done) => {
      chai
        .request(urlAuth)
        .post("/login")
        .send({
          username: "",
          password: password,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe("auth routes login", () => {
    it("it should return 400 - password empty", (done) => {
      chai
        .request(urlAuth)
        .post("/login")
        .send({
          username: username,
          password: "",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("auth routes login", () => {
    it("it should return 400 - body empty", (done) => {
      chai
        .request(urlAuth)
        .post("/login")
        .send({
          username: "",
          password: "",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("auth routes login", () => {
    it("it should return 400 - username/password incorrect", (done) => {
      chai
        .request(urlAuth)
        .post("/login")
        .send({
          username: "dsfdf",
          password: "dsfds",
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("auth routes login", () => {
    it("it should return 200 and auth token", (done) => {
      chai
        .request(urlAuth)
        .post("/login")
        .send({
          username: username,
          password: password,
        })
        .end((err, res) => {
          res.should.have.status(200);

          res.body.should.have.property("user");
          res.body.user.should.be.equal(username);

          res.body.should.have.property("expiresIn");
          res.body.expiresIn.should.be.a("number");

          res.body.should.have.property("id");
          res.body.id.should.be.a("string");

          res.body.should.have.property("token");
          res.body.token.should.be.a("string");

          token = res.body.token;
          done();
        });
    });
  });
});

describe("mission service", () => {
  const urlMission = serverUrl + "/api/v1/mission";

  describe("find all missions", () => {
    it("it should GET / - should return status 200", (done) => {
      chai
        .request(urlMission)
        .get("/")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);

          res.body.should.have.property("message");
          res.body.message.should.be.equal("success");

          res.body.should.have.property("data");
          res.body.data.should.be.a("array");
          done();
        });
    });

    it("it should handle 404 error", (done) => {
      chai
        .request(serverUrl)
        .get("/notExist")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe("create/update mission", () => {
    it("it should GET / - should return status 200", (done) => {
      chai
        .request(urlMission)
        .post("/")
        .set("Authorization", "Bearer " + token)
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);

          res.body.should.have.property("message");
          res.body.message.should.be.equal("success");

          res.body.should.have.property("data");
          res.body.data.should.be.eql(data);
          done();
        });
    });

    it("it should return code 200, update, sended prev data", (done) => {
      chai
        .request(urlMission)
        .post("/")
        .set("Authorization", "Bearer " + token)
        .send(data)
        .end((err, res) => {
          res.should.have.status(200);

          res.body.should.have.property("message");
          res.body.message.should.be.equal("success");

          res.body.should.have.property("data");
          res.body.data.should.be.eql(data);
          done();
        });
    });
  });

  describe("delete mission", () => {
    it("it should return code 404, ", (done) => {
      chai
        .request(urlMission)
        .delete("/")
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it("it should return code 200", (done) => {
      chai
        .request(urlMission)
        .delete("/" + data.key)
        .set("Authorization", "Bearer " + token)
        .end((err, res) => {
          res.should.have.status(200);

          res.body.should.have.property("message");
          res.body.message.should.be.equal("success");

          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          done();
        });
    });
  });
});
