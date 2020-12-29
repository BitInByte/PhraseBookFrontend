export const isEmail = (email: string) => {
  const regexValidator = /\S+@\S+\.\S+/;

  return regexValidator.test(email);
};

export const isLength = (length: number, text: string) => text.length >= length;
