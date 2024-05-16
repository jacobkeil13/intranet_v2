import { db } from "$lib/util/database";
import { error } from "@sveltejs/kit";

export async function load({ url, fetch }) {
  const limit = Number(url.searchParams.get('limit')) || 5;
	const skip = Number(url.searchParams.get('skip')) || 0;

  const owner = url.searchParams.get("owner");

  let whereClause: any = {};
  if (owner !== "all") {
    whereClause.advisor = {
      equals: "Jasmine Edwards"
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

  return {
    appointments,
    total
  }
}