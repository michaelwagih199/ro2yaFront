import { PatientsModel } from "./patients"

export class PvModel {
    id!: number
    pvCode!: string
    pvComment!: string
    patient!: PatientsModel
    isArchived!: boolean
    createdDate!: string
  }