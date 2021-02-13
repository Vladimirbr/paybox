import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.should();
chai.use(chaiHttp);

const serverUrl = "http://localhost:3001/api";

/* Test the /GET route */
describe("app get index route - server running check", () => {
  it("it should GET / - basic", (done) => {
    chai
      .request(serverUrl)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("it should handle 404 error - basic", (done) => {
    chai
      .request(serverUrl)
      .get("/notExist")
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});

const data = {
  key: "ab2",
  value: {
    b: 1,
    c: 3,
  },
};
const userId = "60264078573fcf295c14afb1";
const dataForEncrypt = {
  data,
  userId,
};
const encryptDataForSend =
  "U2FsdGVkX187W6o1X+7QFoMDr6gYn0kQilTLcVdTR7+qJk1pCz9zlkuQHvWzKDU0n2d6pVkuqtzLERXgzi8GC3HWeSc009uisDb9PLKlL+V9NtXd97DZ4OFP9aPXdp0CnMVJ8lasLyw00JMkkgFvbA==";

const userIdEncrypted = "U2FsdGVkX1+UKuOzDy19LTHFlQUw6BU7TzKLlNFUwcboK0U6cf9nFACdbXpvUdWyaKIWXHrDLB2tjn5ut8x2XA==";

describe("mission routes", () => {
  describe("should return status 400 from createUpdateMission", () => {
    it("it should handle 400 error", (done) => {
      chai
        .request(serverUrl)
        .post("/createUpdateMission")
        .set("Content-Type", "text/plain")
        .send("")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("should return status 200 from createUpdateMission", () => {
    it("it should handle 200 ", (done) => {
      chai
        .request(serverUrl)
        .post("/createUpdateMission")
        .set("Content-Type", "text/plain")
        .send(encryptDataForSend)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("should return status 200 from createUpdateMission second send - update ", () => {
    it("it should handle 200 ", (done) => {
      chai
        .request(serverUrl)
        .post("/createUpdateMission")
        .set("Content-Type", "text/plain")
        .send(encryptDataForSend)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("should return status 200 from findMission", () => {
    it("it should handle 200 ", (done) => {
      chai
        .request(serverUrl)
        .post("/findMission")
        .set("Content-Type", "text/plain")
        .send(userIdEncrypted)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("should return status 400 from findMission", () => {
    it("it should handle 400 ", (done) => {
      chai
        .request(serverUrl)
        .post("/findMission")
        .set("Content-Type", "text/plain")
        .send("")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("should return status 200 from deleteMission", () => {
    it("it should handle 200 ", (done) => {
      chai
        .request(serverUrl)
        .post("/deleteMission")
        .set("Content-Type", "text/plain")
        .send(encryptDataForSend)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("should return status 400 from deleteMission", () => {
    it("it should handle 400 ", (done) => {
      chai
        .request(serverUrl)
        .post("/deleteMission")
        .set("Content-Type", "text/plain")
        .send("")
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
