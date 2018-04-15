const assert = require("assert");
const User = require("../src/user");

describe("Validation records", () => {
  it("requires a username", () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name is required");
  });
  it("username must be longer than 2 chars", () => {
    const user = new User({ name: "Va" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === "Name must be longer than 2 characters");
  });
  it("disallows invalid records from being saved", async () => {
    const user = new User({ name: "Va" });
    try {
      await user.save();
    } catch (err) {
      const { message } = err.errors.name;
      assert(message === "Name must be longer than 2 characters");
    }
  });
});
