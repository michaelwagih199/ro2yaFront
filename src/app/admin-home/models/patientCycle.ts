import { PatientsModel } from './patients';
import { CenterModel } from './center';

export class PatientCycleModel {
  id!: number;
  injectionDate!: any;
  comment!:string;
  injectionPayment!:string;
  octDate!: any;
  voucherNo!: string;
  injectionEye!: string;
  patient!: PatientsModel;
  hospital!: CenterModel;
  created!: string;
  updated!: string;
  isArchived!: boolean;
}

