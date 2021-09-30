import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { IDateProvider } from '../IDateProvider';

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  dateNow(): Date {
    return dayjs().toDate();
  }

  compareHours(start_date: Date, end_date: Date): number {
    const utc_end_date = this.convertToUTC(end_date);
    const utc_start_date = this.convertToUTC(start_date);

    return dayjs(utc_end_date).diff(utc_start_date, 'hours');
  }

  compareDays(start_date: Date, end_date: Date): number {
    const utc_end_date = this.convertToUTC(end_date);
    const utc_start_date = this.convertToUTC(start_date);

    return dayjs(utc_end_date).diff(utc_start_date, 'days');
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }
}

export { DayjsDateProvider };
