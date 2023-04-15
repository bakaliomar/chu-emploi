export default class User implements CurrentUser {
  first_name = "";
  last_name = "";
  email = "";
  id = "";
  roles = "";
  cin = "";

  constructor(user: CurrentUser) {
    this.first_name = user.first_name || "";
    this.last_name = user.last_name || "";
    this.email = user.email || "";
    this.id = user.id || "";
    this.roles = user.roles || "";
    this.cin = user.cin || "";
  }

  get isManager(): boolean {
    return this.roles === "MANAGER";
  }

  get isAdmin(): boolean {
    return this.roles === "ADMIN";
  }
}
