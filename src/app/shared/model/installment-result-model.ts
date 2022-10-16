export interface InstallmentResultModel {
    paymentDates: Date[];
    paymentAmount: number;
    interestAmount: number;
    mainDept: number;
    withInterestAmount: number;
    totalInstallment: number;
    customerId: number
    createdAt: Date;
    createdBy: number;
    mainId: number;
}
