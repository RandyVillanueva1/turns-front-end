import { CatTurnModel } from "./cat-turn.model"

export interface Account {
  id_account?: number;
  name?: string;
  email?: string;
  password?: string; 
  id_cat_type_account?: CatTurnModel;
}
