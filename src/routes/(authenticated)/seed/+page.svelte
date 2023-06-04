<script lang="ts">
	import { applyAction, enhance } from "$app/forms";
</script>

<h1>Seed Database</h1>
<form method="POST" action="?/seedPermissions" use:enhance>
	<button style="background-color: purple; color: white" class="btn">Seed Permissions</button>
</form>

<form method="POST" action="?/seedRoles" use:enhance>
	<button style="background-color: black; color: white" class="btn">Seed Roles</button>
</form>

<form method="POST" action="?/seedUsers" use:enhance>
	<button style="background-color: green; color: white" class="btn">Seed Users</button>
</form>

<form method="POST" action="?/seedProjects" use:enhance>
	<button style="background-color: blue; color: white" class="btn">Seed Projects</button>
</form>

<form method="POST" action="?/seedTasks" use:enhance>
	<button style="background-color: orangered; color: white" class="btn">Seed Tasks</button>
</form>
