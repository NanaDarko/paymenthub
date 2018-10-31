import { baseModel } from "./base_Model";
import { Approval } from "./approvals";
import { BatchTransaction } from "./batchTransaction";

export interface IBatch {}

export class Batch extends baseModel {
    checkSum: number;
    totalAmout: number;
    currentCount: number;
    approvals: Approval[];
    batchTransactions: BatchTransaction[];
    status: string;
    date: string;
}