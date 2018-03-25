const assert = require("assert");
const User = require("../src/user");

describe("Deleting a user", () => {
  let mark;
  beforeEach(async () => {
    mark = new User({ name: "Mark" });
    await mark.save();
  });

  it("model inst remove", async () => {
    await mark.remove();
    const user = await User.findOne({ name: "Mark" });
    assert(user === null);
  });
  it("class remove", done => {
    User.remove({ name: "Mark" })
      .then(() => User.findOne({ name: "Mark" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
  it("findOneAndRemove", done => {
    User.findOneAndRemove({ name: "Mark" })
      .then(() => User.findOne({ name: "Mark" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
  it("findByIdAndRemove", done => {
    User.findByIdAndRemove(mark._id)
      .then(() => User.findOne({ name: "Mark" }))
      .then(user => {
        assert(user === null);
        done();
      });
  });
});
