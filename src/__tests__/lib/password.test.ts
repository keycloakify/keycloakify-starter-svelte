import { describe, expect, it } from "vitest";
import {
  evaluatePassword,
  getFirstPasswordError,
  isPasswordValid,
  passwordsMatch,
  passwordStrength,
} from "../../lib/password";

describe("password helper", () => {
  it("rejects passwords shorter than 8 chars", () => {
    expect(isPasswordValid("Ab1!xy")).toBe(false);
  });

  it("rejects passwords missing uppercase / lowercase / digit", () => {
    expect(isPasswordValid("abcdefg1!")).toBe(false); // no uppercase
    expect(isPasswordValid("ABCDEFG1!")).toBe(false); // no lowercase
    expect(isPasswordValid("Abcdefgh!")).toBe(false); // no digit
  });

  it("rejects passwords without a special character", () => {
    expect(isPasswordValid("Abcdefg1")).toBe(false);
  });

  it("rejects passwords equal to the supplied identity (case-insensitive)", () => {
    expect(isPasswordValid("Foo@1234", "foo@1234")).toBe(false);
    expect(isPasswordValid("Foo@1234", "FOO@1234")).toBe(false);
  });

  it("accepts a password meeting every rule", () => {
    expect(isPasswordValid("Abcdefg1!")).toBe(true);
    expect(isPasswordValid("Abcdefg1!", "ada@example.com")).toBe(true);
  });

  it("evaluatePassword returns one entry per rule with pass flags", () => {
    const result = evaluatePassword("Abc1");
    expect(result.map((r) => r.id)).toEqual(["length", "mixed", "special", "notIdentity"]);
    expect(result.find((r) => r.id === "length")?.pass).toBe(false);
    expect(result.find((r) => r.id === "mixed")?.pass).toBe(true);
    expect(result.find((r) => r.id === "special")?.pass).toBe(false);
    expect(result.find((r) => r.id === "notIdentity")?.pass).toBe(true);
  });

  it("getFirstPasswordError surfaces failing rule in PASSWORD_RULES order", () => {
    expect(getFirstPasswordError("short")).toMatch(/Minimum 8 characters/);
    expect(getFirstPasswordError("alllongbutweak")).toMatch(/uppercase, lowercase and a number/);
    expect(getFirstPasswordError("Abcdefg1")).toMatch(/special character/);
    expect(getFirstPasswordError("Abcdefg1!")).toBeUndefined();
    expect(getFirstPasswordError("Abcdefg1!", "Abcdefg1!")).toMatch(/same as your email or username/);
  });

  it("passwordStrength: empty → weak, 3-of-4 → medium, 4-of-4 → strong", () => {
    expect(passwordStrength("")).toBe("weak");
    expect(passwordStrength("Abcdefg1")).toBe("medium"); // missing only special
    expect(passwordStrength("Abcdefg1!")).toBe("strong");
  });

  it("passwordsMatch is false when either side is empty", () => {
    expect(passwordsMatch("", "")).toBe(false);
    expect(passwordsMatch("Abcdefg1!", "")).toBe(false);
  });

  it("passwordsMatch is true only on exact, non-empty match", () => {
    expect(passwordsMatch("Abcdefg1!", "Abcdefg1!")).toBe(true);
    expect(passwordsMatch("Abcdefg1!", "Abcdefg1")).toBe(false);
  });
});
