export default ({ next, auth }: Context) => {
  if (!auth?.currentUser.isAdmin) {
    return false;
  }
  return true;
};
