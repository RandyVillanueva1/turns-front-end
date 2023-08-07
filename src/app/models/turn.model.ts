import { AccountModel } from "./account.model"
import { CatTurnModel } from "./cat-turn.model"

export interface TurnModel{
    id_turno: number;
    id_cuenta: AccountModel | undefined;
    id_cat_turno: CatTurnModel | undefined;
    id_cat_tipo_cuenta: number; // Agregar esta propiedad al modelo
}