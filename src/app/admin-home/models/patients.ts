import { DoctorModel } from "./doctor"

export class PatientsModel {
    id!: number
    age!: string
    patientCode!:string
    gender!: string
    phone!: string
    phone2!: string
    patientName!: string
    patientIDNumber!: string
    comments!: string
    address!: string
    governorate!: string
    previousTreatment!: string
    nationality!: string
    indication!: string
    diagnosedDate: any
    startingLucentisDate: any
    isArchived!: boolean
    createdDate!: string;
    doctor!: DoctorModel
  }
  