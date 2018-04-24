const assert = require("assert");
const User = require("../src/user");

describe("Subdocuments", () => {
  it("can create a subdocument", async () => {
    const vasa = new User({
      name: "Vasa",
      posts: [{ title: "Post" }]
    });
    await vasa.save();
    const user = await User.findOne({ name: "Vasa" });
    assert(user.posts[0].title === "Post");
  });
  it("can add subdocument to an existing record", async () => {
    var vasa = new User({
      name: "Vasa",
      posts: []
    });
    await vasa.save();
    vasa = await User.findOne({ name: "Vasa" });
    vasa.posts.push({ title: "PostTitle" });
    await vasa.save();
    vasa = await User.findOne({ name: "Vasa" });
    assert(vasa.posts[0].title === "PostTitle");
  });
  it("can remove an existing subdocument", async () => {
    const vasa = new User({
      name: "Vasa",
      posts: [{ title: "new Title" }]
    });
    await vasa.save();
    const user = await User.findOne({ name: "Vasa" });
    user.posts[0].remove();
    await user.save();
    const userUpdated = await User.findOne({ name: "Vasa" });
    assert(userUpdated.posts.length === 0);
  });
});
