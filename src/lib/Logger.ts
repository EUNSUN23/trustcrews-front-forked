export class Logger {
  public marker: string;

  constructor(marker: string) {
    this.marker = marker;
  }

  public createTimestamp() {
    const time = Date.now();
    const date = new Date(time);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  public i(message: string) {
    console.log(`[${this.marker}] ${this.createTimestamp()} ${message}`);
  }

  public e(arg: string | Error) {
    console.log(
      `[${this.marker}] ${this.createTimestamp()} ERROR ${typeof arg === 'string' ? arg : arg.message}`,
    );
  }
}
