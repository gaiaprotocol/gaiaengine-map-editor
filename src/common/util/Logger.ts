import Calendar from "./Calendar.js";

export default class Logger {
  private static get time() {
    const time = new Calendar();
    return `${time.monthFormal}-${time.dateFormal} ${time.hoursFormal}:${time.minutesFormal}`;
  }

  public static success(message: string) {
    console.log(`[32m[${this.time}] ${message}[0m`);
  }

  public static warning(message: string) {
    console.log(`[33m[${this.time}] ${message}[0m`);
    console.trace();
  }

  public static error(message: any, parameters?: any) {
    console.log(
      `[31m[${this.time}] ${message}[0m`,
      parameters === undefined ? "" : parameters,
    );
    console.trace();
  }
}
