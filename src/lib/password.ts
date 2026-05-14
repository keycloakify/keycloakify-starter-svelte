// Single source of truth for client-side password rules across the theme.
// Server-side rules in Keycloak's password policy must stay in sync —
// update both when changing.

export type PasswordRule = {
  id: string;
  /** Short label rendered in the inline policy panel ("At least 8-12 characters in length"). */
  text: string;
  /** Inline error sentence when this rule fails ("Minimum 8 characters required"). */
  errorMessage: string;
  /** Identity-aware test. The optional `identity` (email or username) is used by the
   * "cannot be same as email or username" rule; other rules ignore it. */
  test: (password: string, identity?: string) => boolean;
};

export const PASSWORD_RULES: readonly PasswordRule[] = [
  {
    id: "length",
    text: "At least 8-12 characters in length",
    errorMessage: "Minimum 8 characters required",
    test: (p) => p.length >= 8,
  },
  {
    id: "mixed",
    text: "Must include uppercase, lowercase and number",
    errorMessage: "Must include uppercase, lowercase and a number",
    test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p) && /\d/.test(p),
  },
  {
    id: "special",
    text: "Special characters",
    errorMessage: "Must include a special character",
    test: (p) => /[^A-Za-z0-9]/.test(p),
  },
  {
    id: "notIdentity",
    text: "Can not be same as email or username",
    errorMessage: "Password cannot be the same as your email or username",
    // Auto-passes when there is no identity to compare against (e.g. anonymous
    // reset flow); the server still re-checks if its policy demands.
    test: (p, identity) => {
      if (!identity) return true;
      return p.toLowerCase() !== identity.toLowerCase();
    },
  },
];

export type EvaluatedRule = { id: string; text: string; pass: boolean };

export function evaluatePassword(password: string, identity?: string): EvaluatedRule[] {
  return PASSWORD_RULES.map(({ id, text, test }) => ({ id, text, pass: test(password, identity) }));
}

export function isPasswordValid(password: string, identity?: string): boolean {
  return PASSWORD_RULES.every(({ test }) => test(password, identity));
}

export function passwordsMatch(password: string, confirm: string): boolean {
  return password.length > 0 && password === confirm;
}

/**
 * Returns the error message for the first failing rule (in PASSWORD_RULES order),
 * or undefined when the password satisfies every rule.
 *
 * Rules are checked sequentially so the user sees one corrective hint at a time.
 */
export function getFirstPasswordError(password: string, identity?: string): string | undefined {
  return PASSWORD_RULES.find(({ test }) => !test(password, identity))?.errorMessage;
}

export type PasswordStrength = "weak" | "medium" | "strong";

/**
 * Coarse strength label driven by how many of the four rules pass.
 *  - 4 of 4   → "strong"
 *  - 3 of 4   → "medium"
 *  - 0–2 of 4 → "weak"
 *
 * The Figma "Password Policy: Strong" label uses this; intermediate states
 * surface as "Weak" / "Medium" while the user is still typing.
 */
export function passwordStrength(password: string, identity?: string): PasswordStrength {
  if (password.length === 0) return "weak";
  const passed = PASSWORD_RULES.filter(({ test }) => test(password, identity)).length;
  if (passed === PASSWORD_RULES.length) return "strong";
  if (passed === PASSWORD_RULES.length - 1) return "medium";
  return "weak";
}
