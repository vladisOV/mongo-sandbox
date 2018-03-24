const assert = require("assert");
const User = require("../src/user");

describe("Reading users from db", () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => {
      done();
    });
  });
  it("Finds all users with name Joe", done => {
    User.find({ name: "Joe" }).then(users => {
      console.log(users);
      done();
    });
  });
});
