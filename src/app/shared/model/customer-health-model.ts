export interface CustomerHealthModel {
    id: number;
    customerId: number;
    mainDiseaseId?: number;
    subDiseaseId?: number;
    description: string;
    createdAt: Date;
    createdBy?: number;
}
