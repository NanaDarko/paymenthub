import { Bank } from './bank';
import { C_Type } from './contact-type';
import { baseModel } from './base_Model';

export class Contact extends baseModel {
    typeId: number;
    contactType: C_Type;
    bankId: string;
    bank: Bank;
    branch: string;
    accountNumber: string;
    phoneNumber: string;
    email: string;
    comment: string;
}