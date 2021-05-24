import { CenterModel } from "./center";

export class DoctorModel {
  id!: number;
  doctorName!: string;
  isArchived!: boolean;
  createdDate!: string;
  hospital!:CenterModel;
}
