export default ({ next, auth }: Context) => {
  if (!auth?.isAuth) {
    next("/login");
    return false;
  }
  return true;
};
