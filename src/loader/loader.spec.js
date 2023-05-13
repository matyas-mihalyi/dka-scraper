import { getUniqueTopics } from "./loader";

describe("getUniqueTopics", () => {
  it("should return a unique array of topic objects", () => {
    const obj = {
      id: 1,
      name: "name"
    };
    const obj2 = JSON.parse(JSON.stringify(obj));
    const input = [obj, obj2];
    const expected = [obj];
    const actual = getUniqueTopics(input);

    expect(actual).toStrictEqual(expected);
  });
});