<template>
    <private-view smallHeader headerShadow>
		<iframe 
			plausible-embed 
			src="https://analytics.gisei.es/share/turismoderoquetasdemar.es?auth=XxVdXno21TJvwvuIoVJhE&embed=true&theme=light&background=transparent" 
			scrolling="no" 
			frameborder="0" 
			loading="lazy" 
			style="width: 1px; min-width: 100%; height: 1600px;"
		/>
    </private-view>
	<component is="style" type="text/css">
		#navigation > .resize-wrapper, #sidebar, .header-bar {
			display: none !important;
		}
		#main-content {
			margin-right: 0 !important;
		}
	</component>
	<component is="script" async src="https://analytics.gisei.es/js/embed.host.js"></component>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'PlausiblePanel',
	setup() {
		return {};
	},
});
</script>