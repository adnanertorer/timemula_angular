export interface EducatorCostModel {
    id: number;
    educatorId: number;
    packageId: number;
    lessonId: number;
    currentDate: any;
    cost: number;
    description: string;
    createdAt: Date;
    createdBy: number;
    transactionType: number;
    changedAt?: Date;
    changedBy?: number;
    cashBoxId: number;
    staffName: string;
    classroomName: string;
    lessonName: string;
}