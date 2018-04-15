const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let vasya;
  beforeEach(async () => {
    vasya = new User({ name: "Vasya", postCount: 0 });
    await vasya.save();
  });

  async function assertName() {
    const users = await User.find({});
    assert(users.length === 1);
    assert(users[0].name === "petya");
  }

  it("model inst set & save", async () => {
    vasya.set("name", "petya");
    await vasya.save();
    assertName();
  });
  it("inst update", async () => {
    await vasya.update({ name: "petya" });
    assertName();
  });
  it("model class update", async () => {
    await User.update({ name: "Vasya" }, { name: "petya" });
    assertName();
  });
  it("model class findOneAndUpdate", async () => {
    await User.findOneAndUpdate({ name: "Vasya" }, { name: "petya" });
    assertName();
  });
  it("model class update by Id", async () => {
    await User.findByIdAndUpdate(vasya._id, { name: "petya" });
    assertName();
  });
  it("user can increment postCount", async () => {
    await User.update({ name: "Vasya" }, { $inc: { postCount: 1 } });
    const user = await User.findOne({ name: "Vasya" });
    assert(user.postCount === 1);
  });
});
