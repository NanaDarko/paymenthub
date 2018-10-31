import { baseModel } from "./base_Model";
import { Batch } from "./batch";
import { Contact } from "./contact";

export interface IBatchTransaction {}

export class BatchTransaction extends baseModel {
    batch: Batch;
    batchId: string;
    contact: Contact;
    contactId: string;
    branch: string;
    date: string;
    //issuer: Issuer;
    issuerId: string;
    amount: number;
    comments: string;
    status: string;


}