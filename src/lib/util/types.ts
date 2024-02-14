export interface Toast {
  id: string | null;
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