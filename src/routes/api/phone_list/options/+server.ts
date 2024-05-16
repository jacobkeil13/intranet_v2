import { db } from '$lib/util/database';
import { json } from '@sveltejs/kit';

export async function GET({ request, url }) {
  let users = await db.userProfile.findMany({
    orderBy: {
      first_name: 'asc'
    },
    include: {
      team: true,
      title: true,
      role: true,
      directReport: true
    }
	});

  return json({
    users: users
      .filter(user => !user.first_name.includes('TBD'))
      .map(user => ({
        label: user.first_name + " " + user.last_name,
        value: user.netid
      }))
  });
}
