import { db } from "$lib/util/database";
import { redirect } from "@sveltejs/kit";
import { retired_token } from "$lib/util/helpers";
import moment from "moment";

interface CreateActionResult {
	status: "success" | "error" | "info";
	action: "create" | "update" | "delete";
	message: string;
	new_form?: {
		id: string,
    rraareqCode: string,
    aidYear:  string,
    name: string,
    owner: string,
    updatedAt: string
	};
	name?: string;
}

export const load = async ({ locals }) => {
	if (locals.user) {
		let total = await db.form.count();
		let forms = await db.form.findMany({
			orderBy: {
				name: 'asc'
			},
			include: {
				aidYear: true,
				owner: true
			},
			take: 10,
			skip: 0,
		});
		return { forms, user: locals.user, total };
	} else {
		throw redirect(302, '/dashboard');
	}
};

export const actions = {
	create: async ({ request }): Promise<CreateActionResult> => {
		const { name, aidYear, owner, rraareqCode, bdms, web, updatedAt } = Object.fromEntries(await request.formData()) as {
			name: string;
			aidYear: string;
			owner: string;
			rraareqCode: string;
			bdms: string;
			web: string;
			updatedAt: string;
		};

		try {
			const newForm = await db.form.create({
				include: {
					aidYear: true,
					owner: true
				},
				data: {
					owner: { connect: { netid: owner } },
					aidYear: { connect: { name: aidYear } },
					name: name,
					rraareqCode: rraareqCode,
					bdms: bdms === 'true',
					web: web === 'true',
					createdAt: updatedAt !== '' ? moment(updatedAt).add(12, 'hours').format() : undefined,
					updatedAt: updatedAt !== '' ? moment(updatedAt).add(12, 'hours').format() : undefined
				}
			});

			return { status: 'success', action: 'create', message: 'Form Created', new_form: {
				id: newForm?.id,
				rraareqCode: newForm?.rraareqCode,
				aidYear: newForm?.aidYear.name,
				name: newForm?.name,
				owner: newForm?.owner.first_name + " " + newForm?.owner.last_name,
				updatedAt: moment(newForm?.updatedAt).format('YYYY-MM-DD')
			} };
		} catch (error) {
			console.log({ timestamp: moment().format(), source: 'Form_Create', error });
			return { status: 'error', action: 'create', message: 'Form creation failed.', name: name };
		}
	},
	update: async ({ request }): Promise<CreateActionResult> => {
		const { id, name, aidYear, owner, rraareqCode, bdms, web, updatedAt } = Object.fromEntries(await request.formData()) as {
			id: string;
			name: string;
			aidYear: string;
			owner: string;
			rraareqCode: string;
			bdms: string;
			web: string;
			updatedAt: string;
		};

		try {
			const updatedForm = await db.form.update({
				where: {
					id
				},
				include: {
					aidYear: true,
					owner: true
				},
				data: {
					owner: { connect: { netid: owner } },
					aidYear: { connect: { name: aidYear } },
					name: name,
					rraareqCode: rraareqCode,
					bdms: bdms === 'true',
					web: web === 'true',
					createdAt: updatedAt !== '' ? moment(updatedAt).add(12, 'hours').format() : undefined,
					updatedAt: updatedAt !== '' ? moment(updatedAt).add(12, 'hours').format() : undefined
				}
			});

			return { status: 'success', action: 'update', message: 'Form Updated', new_form: {
				id: updatedForm?.id,
				rraareqCode: updatedForm?.rraareqCode,
				aidYear: updatedForm?.aidYear.name,
				name: updatedForm?.name,
				owner: updatedForm?.owner.first_name + " " + updatedForm?.owner.last_name,
				updatedAt: moment(updatedForm?.updatedAt).format('YYYY-MM-DD')
			} };
		} catch (error) {
			console.log({ timestamp: moment().format(), source: 'Form_Updated', error });
			return { status: 'error', action: 'update', message: 'Form updated failed.', name: name };
		}
	},
	delete: async ({ request }): Promise<CreateActionResult> => {
		const { id, name } = Object.fromEntries(await request.formData()) as {
			id: string;
			name: string;
		};

		try {
			await db.form.delete({
				where: {
					id
				}
			});

			return { status: 'success', action: 'delete', message: 'Form Deleted', name};
		} catch (error) {
			console.log({ timestamp: moment().format(), source: 'Form_Deleted', error });
			return { status: 'error', action: 'delete', message: 'Form deletion failed.', name };
		}
	}
};
