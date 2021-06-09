import { PatientCycleModel } from "./patientCycle";

export class CenterAdminDataModel {
    id!:           number;
    cycleStatues!: string;
    patientCycle!: PatientCycleModel;
    isArchived!:   boolean;
    createdDate!:  string;
}
