import { PatientCycleModel } from "./patientCycle";

export interface CenterAdminDataModel {
    id:           number;
    cycleStatues: string;
    patientCycle: PatientCycleModel;
    isArchived:   boolean;
    createdDate:  string;
}
