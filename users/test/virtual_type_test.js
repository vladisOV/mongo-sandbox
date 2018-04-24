const assert = require("assert");
const User = require("../src/user");

describe("Virtual types", () => {
  it("postCount returns number of posts", async () => {
    const vasa = new User({
      name: "Vasa",
      posts: [{ title: "PostTitle" }]
    });
    await vasa.save();
    const user = await User.findOne({ name: "Vasa" });
    assert(user.postCount === 1);
  });
});
