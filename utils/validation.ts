type ValidateFunction = (arg0: string) => boolean;

export const isValidEmail: ValidateFunction = email => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const isStrongPassword: ValidateFunction = password =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+~`\-={}[\]:;'"<>,.?\\/]).{8,}$/.test(password);
