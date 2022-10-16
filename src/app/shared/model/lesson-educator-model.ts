export interface LessonEducatorModel {
    id: number;
    staffId: number;
    isActive: boolean;
    createdBy?: number;
    createdAt: Date;
    lessonId?: number;
    seansPrice: number;
}
