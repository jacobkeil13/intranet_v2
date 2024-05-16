import { redirect } from '@sveltejs/kit';
import { db } from '$lib/util/database';

export const load = async ({ locals }) => {
	if (locals.user) {
		const profile = await db.userProfile.findFirst({
      where: {
        netid: locals.user.netid
      },
      include: {
        role: true,
        title: true,
        team: true
      }
    });
		const constants = locals.constants;
		return { profile, constants };
	} else {
		throw redirect(302, '/login');
	}
};
