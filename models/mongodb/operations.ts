export type InsertResult = { inserted: boolean; insertedCount: number };
export type DeleteResult = { deleted: boolean; deletedCount: number };
export type ModifyResult = { modified: boolean; modifiedCount: number };
export type MoveResult = {
  moved: boolean;
  insertCount: number;
  deleteCount: number;
};
export type RefreshmentResult = {
  insertResult: InsertResult;
  deleteResult: DeleteResult;
};
