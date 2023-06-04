<svg
	class="spinner"
	width="50px"
	height="50px"
	viewBox="0 0 66 66"
	xmlns="http://www.w3.org/2000/svg"
>
	<circle
		class="path"
		fill="transparent"
		stroke-width="2"
		cx="33"
		cy="33"
		r="30"
		stroke="url(#gradient)"
	/>
	<linearGradient id="gradient">
		<stop offset="50%" stop-color="#744aa1" stop-opacity="1" />
		<stop offset="65%" stop-color="#744aa1" stop-opacity=".5" />
		<stop offset="100%" stop-color="#744aa1" stop-opacity="0" />
	</linearGradient>
	<svg
		class="spinner-dot dot"
		width="5px"
		height="5px"
		viewBox="0 0 66 66"
		xmlns="http://www.w3.org/2000/svg"
		x="37"
		y="1.5"
	>
		<circle class="path" fill="#744aa1" cx="33" cy="33" r="30" />
	</svg>
</svg>

<style lang="scss">
	.spinner {
		animation: rotate 1.4s linear infinite;
		-webkit-animation: rotate 1.4s linear infinite;
		-moz-animation: rotate 1.4s linear infinite;
		width: 50px;
		height: 50px;
		position: relative;
	}

	.spinner-dot {
		width: 100px;
		height: 100px;
		position: relative;
		top: 0;
	}

	@keyframes rotate {
		to {
			transform: rotate(360deg);
		}
	}

	@-webkit-keyframes rotate {
		to {
			-webkit-transform: rotate(360deg);
		}
	}

	@-moz-keyframes rotate {
		to {
			transform: rotate(360deg);
		}
	}

	.path {
		stroke-dasharray: 170;
		stroke-dashoffset: 20;
	}
</style>
