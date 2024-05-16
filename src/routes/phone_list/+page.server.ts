import { db } from '$lib/util/database';
import { redirect } from '@sveltejs/kit';
import moment from 'moment';

export const load = async ({ locals }) => {
	if (locals.user) {
		let total = await db.userProfile.count();
		let users = await db.userProfile.findMany({
			orderBy: {
				first_name: 'asc'
			},
			include: {
				team: true,
				title: true,
				role: true,
				directReport: true
			},
      take: 15,
      skip: 0
		});
		let teams = await db.team.findMany({
			orderBy: {
				name: 'asc'
			}
		});
		return { users, teams, user: locals.user, total };
	} else {
		throw redirect(302, '/dashboard');
	}
};