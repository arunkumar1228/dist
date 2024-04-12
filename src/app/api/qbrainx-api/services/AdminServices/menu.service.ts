import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl = 'https://qbrainx.com/qbrainx-web/v1/Menu'; // Assuming this is your backend endpoint
 private url='https://qbrainx.com/qbrainx-web/v1/Contact/create';
  constructor(private http: HttpClient) { }

  createMenu(menuDto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, menuDto);
  }
  deleteMenuById(menuId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/delete/MenuById/${menuId}`;
    return this.http.delete(deleteUrl);
  }

  deleteSubSubMenuById(subSubMenuId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/delete/SubMenuById/${subSubMenuId}`;
    return this.http.delete(deleteUrl);
  }

  getMenus(): Observable<any[]> {
    const url = `${this.apiUrl}/getAll/Menu`; // Replace 'menus' with your actual endpoint for fetching menus
    return this.http.get<any[]>(url);
  }

}
