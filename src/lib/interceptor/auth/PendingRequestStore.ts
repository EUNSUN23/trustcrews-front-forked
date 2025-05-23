type PendingRequest = (error: Error | null) => Promise<void>;
type PendingRequestQueue = PendingRequest[];

export default class PendingRequestStore {
  private pending: Map<string, PendingRequestQueue> = new Map<
    string,
    PendingRequestQueue
  >();

  public add(userId: string, request: PendingRequest) {
    const userRequestQue = this.pending.get(userId);
    if (userRequestQue === undefined) {
      this.pending.set(userId, [request]);
    } else {
      userRequestQue.push(request);
    }
  }

  public delete(userId: string) {
    this.pending.delete(userId);
  }

  public process(userId: string, error: Error | null) {
    const userRequestQue = this.pending.get(userId);
    if (userRequestQue) {
      userRequestQue.forEach((callback) => callback(error));
      this.delete(userId);
    }
  }
}
