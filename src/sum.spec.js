import sum from "./sum";

it("testing sum with number and string", () => {
    expect(sum("1", 2)).toBe(3);
})

test('testing again', () => {
    expect(sum(1, 3)).toBe(4);
})

