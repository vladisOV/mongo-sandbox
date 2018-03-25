const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let vasya;
  beforeEach(done => {
    vasya = new User({ name: "Vasya" });
    vasya.save().then(() => {
      done();
    });
  });

  it("model inst set & save", async () => {
    vasya.set("name", "petya");
    await vasya.save();
    const users = await User.find({ name: "petya" });
    assert(users.length === 1);
    assert(users[0].name === "petya");
  });
});
