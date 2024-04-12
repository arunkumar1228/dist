
import { SubSubMenuDto } from "./sub-menu.model";
export interface SubMenuDto {
    subMenuName: string;
    subMenuPath: string;
    subSubMenus?: SubSubMenuDto[];
  }