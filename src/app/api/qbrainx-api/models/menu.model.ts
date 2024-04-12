// menu.model.ts
import { SubMenuDto } from "./sub-sub-menu.model";

export interface MenuDto {
  menuName: string;
  menuPath: string;
  subMenus?: SubMenuDto[];
}
