import { db } from '$lib/util/database';
import { json } from '@sveltejs/kit';

export async function GET({ request, url }) {
  let aid_years = await db.aidYear.findMany({
    orderBy: {
      name: 'desc'
    }
	});

  return json({
    aid_years: aid_years
      .map(aid_year => ({
        label: aid_year.name,
        value: aid_year.name
      }))
  });
}
