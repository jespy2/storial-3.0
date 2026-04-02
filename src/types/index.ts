export interface IBook {
	username: string;
	_id?: string;
	book: {
		title: string;
		author: string;
		notes: string;
		status: "read" | "unread";
	};
}

export interface IUser {
	username: string;
	password: string;
	email: string;
	books?: IBook[];
	createdAt?: Date;
}

export interface IModalState {
	isOpen: boolean;
	modalContentType: ModalType;
	id?: string;
}

export interface IAlertState {
	isOpen: boolean;
	message: string;
	onConfirm: () => void;
	notificationMessage: string;
}

export interface INotificationState {
	isOpen: boolean;
	message: string;
}

export enum SortItem {
	TITLE = "title",
	AUTHOR = "author",
	STATUS = "status",
}

export enum SortDirection {
	ASC = "asc",
	DESC = "desc",
	NONE = "none",
}

export type BookStatus = IBook['book']['status'];

export interface IBookState {
	books: {
		success: boolean;
		data: IBook[];
		sortInfo: {
			sortBy: SortItem | "";
			sortDirection: SortDirection;
		};
	};
	searchQuery: string;
	activeStatusFilters: BookStatus[];
	isLoading: boolean;
	isError: boolean;
}

export interface IAuthState {
	auth: {
		isLoggedIn: boolean | undefined;
		isAuthenticated: boolean;
		isRegistered: boolean;
		userInfo: IUser;
	};
	isLoading: boolean;
	isError: boolean;
}

export enum ModalType {
	NONE = "NONE",
	ADD_BOOK = "ADD_BOOK",
	EDIT_BOOK = "EDIT_BOOK",
}
