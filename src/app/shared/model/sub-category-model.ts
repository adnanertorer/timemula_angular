export interface SubCategoryModel {
    id: number;
    categoryId: number;
    subCategoryName: string;
    createdBy?: number;
    createdAt: Date;
}
