import { CatTypeAccountModel } from "./cat-type-account.model"

export interface TurnModel{
    id_cuenta?:number,
    nombre?:number,
    correo?:string,
    contrasena?:string,
    id_cat_tipo_cuena?:CatTypeAccountModel
}