import { db } from '$lib/util/database';
import { json } from '@sveltejs/kit';

export async function GET({ request, url }) {
	const limit = Number(url.searchParams.get('limit')) || 10;
	const skip = Number(url.searchParams.get('skip')) || 0;

	const owner = url.searchParams.get("owner");

  let whereClause: any = {};
  if (owner !== "all") {
    whereClause.advisor = {
      equals: owner
    };
  }

  let total = await db.appointment.count({
    where: whereClause
  });
  let appointments = await db.appointment.findMany({
    where: whereClause,
		take: limit,
		skip,
		orderBy: {
			dateTime: 'asc'
		}
	});

  return json(
		{
			appointments,
			total
		}
	)
}
