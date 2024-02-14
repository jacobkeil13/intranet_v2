<script lang="ts">
	import { links, resources } from "$lib/store/resources";
	import { api_key } from "$lib/util/helpers";
	import { ExpansionPanel } from "svelte-ux";
</script>

<section class="p-4 space-y-4">
  <div>
    {#each $resources as resource}
      <ExpansionPanel>
        <div slot="trigger" class="flex-1 p-3">{resource.header}</div>
        <ul class="pl-5 list-disc">
          {#each resource.links as link}
            <li class="hover:underline"><a href={link.link + link.link.includes("tup-ofa.forest.usf.edu") ? '?apiKey=' + api_key : ""} target={link.target}>{link.label}</a></li>
          {/each}
        </ul>
      </ExpansionPanel>
    {/each}
  </div>
  <h1 class="font-medium">Quick Links</h1>
  <ul class="pl-5 list-disc">
    {#each $links as link}
      <li class="hover:underline"><a href={link.link} target={link.target}>{link.label}</a></li>
    {/each}
  </ul>
</section>