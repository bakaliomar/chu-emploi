export default ({ next, auth }: Context) => {
  if (auth?.isAuth) {
    next("/");
    return false;
  }
  return true;
};
