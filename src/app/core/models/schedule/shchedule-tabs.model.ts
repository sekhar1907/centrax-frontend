import { SchedDashboardTabActive } from "../../shared-components/dashboard/schedule/schedule.component";

export interface IScheduleTab {
  name: string;
  icon: string;
  type: 'right' | 'left',
  id?: SchedDashboardTabActive | number;
  patientId?: number | string;
}
