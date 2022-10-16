export interface PaymentModel {
    id: number;
    paymentAmount: number;
    createdAt: Date;
    createdBy: number | null;
    changedAt: Date | null;
    changedBy: number | null;
    cashBoxId: number | null;
    description: string;
    supplierId: number;
}