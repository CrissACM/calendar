export function getEnvVariable() {
	import.meta.env

	return {
		...import.meta.env,
	}
}
