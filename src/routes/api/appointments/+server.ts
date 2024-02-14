import { db } from '$lib/util/database';
import { json } from '@sveltejs/kit';

export async function GET({ request, url }) {

  console.log(request);

	// let masterCalendarItems = await db.masterCalendarItem.findMany({
	// 	where: {
	// 		id: String(url.searchParams.get('id'))
	// 	},
	// 	orderBy: {
	// 		dueDate: 'asc'
	// 	},
	// 	include: {
	// 		type: true,
	// 		primaryOwner: {
	// 			include: {
	// 				directReport: true
	// 			}
	// 		},
	// 		secondaryOwners: true,
	// 		comments: {
	// 			orderBy: {
	// 				createdAt: 'desc'
	// 			}
	// 		}
	// 	}
	// });

	return json({ message: "success" });
}
