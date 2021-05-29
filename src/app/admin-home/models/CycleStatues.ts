
import { PatientCycleModel } from './patientCycle';

export class CycleStatuesModel {
    id!:           number;
    cycleStatues!: EnumCycleStatues;
    patientCycle!: PatientCycleModel;
    createdDate!:  string;
}

export enum EnumCycleStatues {
    Active,
    TestDone,
}
