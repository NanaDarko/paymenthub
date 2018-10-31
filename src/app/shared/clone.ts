import { BatchTransaction } from "../Models/batchTransaction";
import { Batch } from "../Models/batch";

export class Clone{

    cloneBatch(batch: Batch) {
        let clone = new Batch();
        for (var key in batch) {
          if (batch.hasOwnProperty(key)) //ensure not adding inherited props
            clone[key] = batch[key];
        }
        return clone;
      };

      cloneTransaction(transaction : BatchTransaction) {
        let clone = new BatchTransaction();
        for (var key in transaction) {
          if (transaction.hasOwnProperty(key)) //ensure not adding inherited props
            clone[key] = transaction[key];
        }
        return clone;
      };


}