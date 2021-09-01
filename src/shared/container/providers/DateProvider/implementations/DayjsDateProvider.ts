import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../interfaces/IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
  compareInHours(startDate: Date, endDate: Date): number {
    const endDateUtc = this.convertToUTC(endDate);
    const startDateUtc = this.convertToUTC(startDate);
    return dayjs(endDateUtc).diff(startDateUtc, "hours");
  }

  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
