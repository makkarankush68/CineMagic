export const checkValidData = (email, password) => {
  const isEmailValid = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/.test(email);
  const isPassValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!^%*?&]{8,15}$/.test(
      password
    );

  if (!isEmailValid) return "Email isnt Valid !";
  if (!isPassValid)
    return "Password is weak! Please use lowercase, uppercase, number, special character and 8 letters";

  return null;
};
