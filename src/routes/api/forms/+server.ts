import { db } from '$lib/util/database';
import { json } from '@sveltejs/kit';
import moment from 'moment';

export async function GET({ request, url }) {
  const limit = Number(url.searchParams.get('limit')) || 10;
  const skip = Number(url.searchParams.get('skip')) || 0;
  const filters = String(url.searchParams.get('filters')) || '';
  const sort_header = String(url.searchParams.get('sort')) || 'name';
  const sort_order = String(url.searchParams.get('order')) || 'asc';
  const search = String(url.searchParams.get('search')) || null;
  const netid = String(url.searchParams.get('netid')) || null;
  const type = String(url.searchParams.get('type')) || null;
  
  let whereClause: any = {};
  let sort: any = {};

  if (sort_header !== 'null' && sort_order !== 'null' && sort_header && sort_order) {
    if (sort[sort_header] === undefined) sort[sort_header] = {};
    if (sort_header === "aidYear") {
      sort[sort_header].name = sort_order;
    } else if (sort_header === "owner") {
      sort[sort_header].first_name = sort_order;
    } else {
      sort[sort_header] = sort_order;
    }
  }

  if (filters !== 'null' && filters.includes("owner") && netid !== 'null') {
    whereClause.owner = {
      netid: {
        equals: netid
      }
    };
  }

  if (filters !== 'null' && filters.includes("outdated")) {
    whereClause.updatedAt = {
      lt: moment().subtract(1, 'year').format()
    };
    whereClause.aidYear = {
      name: "Non-Year"
    }
  }

  if (type !== 'null' && type !== 'all' && type !== 'retired') {
    let name = "all";
    if(type === 'last_year') name = moment().subtract(1, "year").format("YY") + moment().format("YY");
    if(type === 'current_year') name = moment().format("YY") + moment().add(1, 'year').format("YY");
    if(type === 'next_year') name = moment().add(1, 'year').format("YY") + moment().add(2, 'year').format("YY");
    if(type === 'non_year') name = "Non-Year";
    whereClause.aidYear = {
      name: {
        equals: name
      }
    };
  }

  if (type !== 'null' && type === 'retired') {
    whereClause.name = {
      contains: "<<--RETIRED-->>"
    };
  }

  // Fetch forms based on filter criteria (excluding search)
  let forms_all = await db.form.findMany({ 
    where: whereClause,
    orderBy: sort,
    include: {
      aidYear: true,
      owner: true
    }
  });
  let forms = await db.form.findMany({
    where: whereClause,
    orderBy: sort,
    include: {
      aidYear: true,
      owner: true
    },
    take: limit,
    skip,
  });
  
  let total = forms_all.length;

  // Filter results based on search term if present
  if (search && search !== "" && search !== 'null') {
    // console.log("Search is here");
    forms_all = forms_all.filter(form => {
      const ownerName = `${form.owner.first_name} ${form.owner.last_name}`.toLowerCase();
      const searchLower = search.toLowerCase().trim();
      return form.name.toLowerCase().includes(searchLower) ||
             ownerName.includes(searchLower) ||
             form.rraareqCode.toLowerCase().includes(searchLower);
    });

    // console.log(forms.length);
    // console.log(forms_all.length);

    total = forms_all.length;
    forms = forms_all.slice(skip, skip + limit);
  }

  // Calculate the total after filtering by search

  let formatted_forms = forms.map((form: any) => ({
    id: form.id,
    rraareqCode: form.rraareqCode === form.name ? '-' : form.rraareqCode,
    aidYear: form.aidYear.name,
    name: form.name,
    owner: form.owner.first_name + ' ' + form.owner.last_name,
    updatedAt: moment(form.updatedAt).format('YYYY-MM-DD')
  }));

  return json({
    forms: formatted_forms,
    total
  });
}