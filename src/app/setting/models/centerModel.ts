import { CenterModel } from "src/app/admin-home/models/center";

export class CenterSettingModel {
  id!: number;
  centeruserName!: string;
  centerPassword!: string;
  hospital!: CenterModel;
  isArchived!: boolean;
  createdDate!: string;
}
