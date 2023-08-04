import { CatTypeAccountModel } from "./cat-type-account.model"

export interface AccountModel {
  id_cuenta?: number;
  nombre?: string;
  correo?: string;
  contrasena?: string; 
  id_cat_tipo_cuenta?: CatTypeAccountModel;
}
