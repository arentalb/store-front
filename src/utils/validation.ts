export const emailPattern = {
  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  message: "Enter a valid email address",
};

export const strongPasswordPattern = {
  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  message:
    "Password must include uppercase, lowercase, number, and special character",
};

export const passwordMinLength = {
  value: 8,
  message: "Password must be at least 8 characters",
};
