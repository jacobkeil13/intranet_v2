import { db } from '$lib/util/database';
import { json } from '@sveltejs/kit';

export async function GET({ request, url }) {
	const limit = Number(url.searchParams.get('limit')) || 10;
	const skip = Number(url.searchParams.get('skip')) || 0;
  const by = String(url.searchParams.get('by')) || 'name';
  const direction = url.searchParams.get('direction') || 'asc';

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
		take: limit,
		skip,
	});

  return json(
		{
			users,
			total
		}
	)
}
