export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/person/list', title: 'List of people', icon: 'fas fa-users', class: '' },
];
