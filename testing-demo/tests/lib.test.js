const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
    it("should return a positive number if input is positive", () => {
        const result = lib.absolute(10);
        expect(result).toBe(10);
    });

    it("should return a positive number if input is negative", () => {
        const result = lib.absolute(-10);
        expect(result).toBe(10);
    });

    it("should return zero if input is zero", () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe("greet", () => {
    it("should return the greeting message", () => {
        const result = lib.greet("Mosh");
        expect(result).toMatch(/Mosh/);
    });
});

describe("getCurrencies", () => {
    it("should return supported currencies", () => {

        const result = lib.getCurrencies();

        // Too general
        // expect(result).toBeDefined();
        // expect(result).not.toBeNull();

        //Too specific
        // expect(result[0]).toBe("USD");
        // expect(result[1]).toBe("AUD");
        // expect(result.length).toBe(3);

        //Proper way
        // expect(result).toContain("USD");
        // expect(result).toContain("AUD");
        // expect(result).toContain("EUR");

        //Ideal way
        expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));

    });
});

describe("getProduct", () => {
    it("should return the product with the given id", () => {
        const result = lib.getProduct(1);
        //expect(result).toEqual({ id: 1, price: 10 }); // Must Match Exactly the Same PRoperties
        expect(result).toMatchObject({ id: 1, price: 10 }); // To Only Match Selected Properties
        //expect(result).toHaveProperty("id", 1);
    });
});

describe("registerUser", () => {
    it("should throw if username is falsy", () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => { lib.registerUser(a); }).toThrow();
        });
    });

    it("should return a user object if valid username is passed", () => {
        const result = lib.registerUser("mosh");
        expect(result).toMatchObject({ username: "mosh" });
        expect(result.id).toBeGreaterThan(0);
    });
});

describe("registerUser", () => {
    it("should throw if username is falsy", () => {
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a => {
            expect(() => { lib.registerUser(a); }).toThrow();
        });
    });
});

describe("applyDiscount", () => {
    it("should apply 10% discount if customer has more than 10 points", () => {
        db.getCustomerSync = function (customerId) {
            console.log("Fake Reading Customer");
            return { id: customerId, points: 20 };
        }

        const order = { customerId: 1, totalPrice: 10 };
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe("notifyCustomer", () => {
    it("should send an email to the customer", () => {

        const mockFunction = jest.fn();
        // mockFunction.mockReturnValue(1);
        // const result = mockFunction();

        // mockFunction.mockResolvedValue(1);
        // const result = await mockFunction();

        // mockFunction.mockRejectedValue(new Error("..."));
        // const result = await mockFunction();

        // Mock
        db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });
        mail.send = jest.fn();
        //Act
        lib.notifyCustomer({ customerId: 1 });
        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe("a");
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    });
});