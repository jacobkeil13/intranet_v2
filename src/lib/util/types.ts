export interface Toast {
  id?: string;
  message: string;
  description: string | null;
  type: 'success' | 'error' | 'info';
  duration: number;
  dismissable: boolean;
}

export interface SidebarLink {
	label: string;
	link: string;
	target: string;
}

export interface SidebarLinks {
	header: string;
	links: SidebarLink[];
}

export interface FormObject {
  [key: string]: any
}

export interface Order {
  current_header: string,
  last_header: string,
  current_order: string,
  last_order: string
}