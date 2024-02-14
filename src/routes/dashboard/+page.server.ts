import { db } from "$lib/util/database";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  if (true) {
    let nextTraining = await db.trainingSchedule.findFirst({
			orderBy: {
				date: 'asc'
			},
			where: {
				date: {
					gte: new Date()
				}
			},
			include: {
				trainers: true
			}
		});

    return {
      nextTraining
    }
  } else {
		throw redirect(302, '/login');
	}
}