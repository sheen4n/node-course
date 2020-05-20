const lib = require("../exercise1");

describe("fizzBuzz", () => {
    it("should throw an exception if input is not a number", () => {
        const args = ["1", null, undefined, { id: 1 }, [1, 2]];
        args.forEach(a => {
            expect(() => { lib.fizzBuzz(a); }).toThrow();
        });
    });

    it("should return fizzBuzz if divisible by 3 and 5", () => {
        const result = lib.fizzBuzz(30);
        expect(result).toBe("FizzBuzz");
    });

    it("should return fizzBuzz if divisible by 3 but not 5", () => {
        const result = lib.fizzBuzz(9);
        expect(result).toBe("Fizz");
    });

    it("should return fizzBuzz if divisible by 5 but not 3", () => {
        const result = lib.fizzBuzz(10);
        expect(result).toBe("Buzz");
    });

    it("should return input if not divisible by either 3 or 5", () => {
        const result = lib.fizzBuzz(8);
        expect(result).toBe(8);
    });

});
