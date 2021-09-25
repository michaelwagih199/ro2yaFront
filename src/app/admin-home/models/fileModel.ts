export interface FileModel {
    id:              number;
    docTitle:        string;
    fileName:        string;
    fileDownloadUri: string;
    fileType:        string;
    fileBath:        string;
    size:            number;
    docType:         DocType;
    isArchived:      boolean;
    createdDate:     string;
}

export interface DocType {
    id:                       number;
    docType:                  string;
    patientCycle:             PatientCycle;
}

export interface PatientCycle {
    id:                       number;
    injectionDate:            string;
    octDate:                  string;
    voucherNo:                string;
    injectionEye:             string;
    comment:                  string;
    injectionPayment:         string;
    patient:                  Patient;
    hospital:                 Hospital;
    created:                  string;
    updated:                  string;
    isArchived:               null;
}

export interface Hospital {
    id:                       number;
    hospitalName:             string;
    hospitalPhone1:           string;
    hospitalPhone2:           null;
    isArchived:               boolean;
    createdDate:              string;
}

export interface Patient {
    id:                       number;
    patientCode:              string;
    age:                      number;
    gender:                   string;
    phone:                    string;
    phone2:                   string;
    patientName:              string;
    patientIDNumber:          string;
    comments:                 null;
    address:                  string;
    governorate:              string;
    nationality:              string;
    indication:               string;
    previousTreatment:        string;
    voiceMessageConsent:      string;
    diagnosedDate:            string;
    startingLucentisDate:     string;
    doctor:                   Doctor;
    isArchived:               boolean;
    createdDate:              string;
}

export interface Doctor {
    id:                       number;
    doctorName:               string;
    hospital:                 Hospital;
    isArchived:               boolean;
    createdDate:              string;
}
