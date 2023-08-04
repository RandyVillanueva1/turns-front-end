import { AccountModel } from "./account.model"
import { CatTurnModel } from "./cat-turn.model"

export interface TurnModel{
    id_turno?:number;
    id_cuenta?: AccountModel;
    id_cat_turno?: CatTurnModel
}