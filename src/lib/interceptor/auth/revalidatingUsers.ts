class RevalidatingUsers {
  private users: Set<string> = new Set<string>();

  public add(userId: string) {
    this.users.add(userId);
  }

  public has(userId: string) {
    return this.users.has(userId);
  }

  public delete(userId: string) {
    this.users.delete(userId);
  }
}

const revalidatingUsers = new RevalidatingUsers();
export default revalidatingUsers;
