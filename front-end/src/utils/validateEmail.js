const ValidateEmail = (email) => {
  // regex demonstrado pelo professor Zambelli:
  const regex = /.+@.+\..+/;
  if (email.length > 0 && regex.test(email)) {
    return true;
  }

  return false;
};

export default ValidateEmail;
