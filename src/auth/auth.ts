export default ({ next, auth }: Context) => {
  if (!auth?.isAuth) {
    next("/admin/login");
    return false;
  }
  return true;
};
