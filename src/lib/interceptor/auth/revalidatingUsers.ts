class RevalidatingUsers {
  private revalidations: Set<string> = new Set<string>();

  public add(userId: string) {
    this.revalidations.add(userId);
  }

  public has(userId: string) {
    return this.revalidations.has(userId);
  }

  public delete(userId: string) {
    this.revalidations.delete(userId);
  }
}

const revalidatingUsers = new RevalidatingUsers();
export default revalidatingUsers;
