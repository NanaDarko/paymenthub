import { baseModel } from "./base_Model";
import { Batch } from "./batch";

export interface IApproval { }

export class Approval extends baseModel {
    batch: Batch;
    batchId: string;
    //User: User;
    userId: string;
    //approvalDate: Date;
    approvalDate: string;
}