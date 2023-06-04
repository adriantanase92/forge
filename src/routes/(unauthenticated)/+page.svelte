<script lang="ts">
	import { goto } from "$app/navigation";
</script>

<div class="h-full overflow-hidden wf__login">
	<div class="h-full overflow-hidden wf__login__page">
		<div class="card bg-initial p-4 wf__login__box">
			<img
				src="https://www.nicepng.com/png/detail/35-350581_the-forge-fit-girls-guide-logo.png"
				alt="Forge Logo"
				class="mb-5 wf__login__logo"
			/>

			<h2 class="h1 mb-5 text-center wf__login__title">Welcome to <strong>Forge</strong></h2>

			<form class="wf__form">
				<div class="mb-4 wf__form__group">
					<label for="email" class="label hidden wf__form__label">Email</label>
					<input
						id="email"
						class="input variant-form-material wf__form__control"
						type="email"
						placeholder="Email"
					/>
				</div>
				<div class="mb-4 wf__form__group">
					<label for="password" class="label hidden wf__form__label">Password</label>
					<input
						id="password"
						class="input variant-form-material wf__form__control"
						type="password"
						placeholder="Password"
					/>
				</div>

				<div class="wf__form__actions">
					<button
						type="button"
						class="btn btn-lg variant-filled-primary wf__form__button wf__form__button--submit"
						on:click={() => {
							goto("/dashboard");
						}}>Log in</button
					>
				</div>
			</form>
		</div>
	</div>
</div>

<style lang="scss">
	.wf__login {
		background-color: #dddddd;

		&__page {
			display: grid;
			justify-content: center;
			align-content: center;
		}

		&__box {
			max-width: 38rem;
			width: 100%;
			margin: auto;
		}

		&__logo {
			max-width: 400px;
		}

		&__title {
		}
	}

	.wf__form {
		&__group {
		}

		&__label {
		}

		&__control {
		}

		&__actions {
			display: flex;
			justify-content: flex-end;
		}

		&__button {
			&--submit {
			}
		}
	}
</style>
