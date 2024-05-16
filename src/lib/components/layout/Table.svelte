<div class="rounded-md overflow-auto">
	<table class="table w-full">
		<thead class="border border-gray-200">
			<tr class="text-left rounded bg-gray-200">
				<slot name="header" />
			</tr>
		</thead>
		<tbody class="border border-black/10">
			<slot name="body" />
		</tbody>
	</table>
</div>
