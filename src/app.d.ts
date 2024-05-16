import type {
	Priority,
	Title,
	Team,
	Role,
	AidYear,
	Application,
	LetterCode,
	AddressType,
	RequestType,
	DataRequestType,
	MasterCalendarType,
	UserProfile,
	QueueComment,
	LetterType,
	LetterGroup
} from '@prisma/client';

declare global {
	namespace App {
		interface Locals {
			user: {
				netid: string;
				title: string;
				role: string;
				name: string;
				phone: string;
			};
			constants: {
				priorities: Priority[];
				titles: Title[];
				teams: Team[];
				roles: Role[];
				aidYears: AidYear[];
				applications: Application[];
				letterCodes: LetterCode[];
				letterTypes: LetterType[];
				letterGroups: LetterGroup[];
				addressTypes: AddressType[];
				requestTypes: RequestType[];
				dataRequestTypes: DataRequestType[];
				masterCalendarTypes: MasterCalendarType[];
			};
		}
		export interface Platform {
			req: import('http').IncomingMessage & {
				session: {
					account: {
						username: string;
					};
				};
			};
		}
	}
}

export {};