const validatePassword = (value) => {
  const hasUpperCase = /[A-Z]/.test(value);
      const hasSymbol = /[!@#%&]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      let validConditions = 0;
      const numberOfMustBeValidConditions = 3;
      const conditions = [hasLowerCase, hasUpperCase, hasNumber, hasSymbol];
      conditions.forEach((condition) =>
          condition ? validConditions++ : null
      );
      if (validConditions >= numberOfMustBeValidConditions) {
        return true;
      }
      return false;
}

export default validatePassword;