export const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

// Explain the regex
// (?=.*[A-Z]) - Positive lookahead assertion that requires at least one uppercase letter.
// (?=.*[0-9]) - Positive lookahead assertion that requires at least one number.
// (?=.*[!@#$%^&*]) - Positive lookahead assertion that requires at least one special character from the set of special characters specified.
// .{8,30} - Requires at least 8 characters and maximum 30.
export const passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,30}$/;
