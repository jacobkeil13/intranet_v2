import { db } from '$lib/util/database';
import { json } from '@sveltejs/kit';
import moment from 'moment';

export async function GET({ request, url, params }) {
  let form = await db.form.findFirst({
    where: {
      id: params.id
    },
    orderBy: {
      name: 'asc'
    },
    include: {
      aidYear: true,
      owner: true
    },
  });

  return json({
    form: {
      id: form?.id,
      rraareqCode: form?.rraareqCode,
      aidYear: form?.aidYear.name,
      name: form?.name,
      owner: form?.owner.netid,
      updatedAt: moment(form?.updatedAt).format('YYYY-MM-DD'),
      bdms: form?.bdms,
      web: form?.web
    },
  });
}