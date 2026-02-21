/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
	readonly UMAMI_API_KEY?: string;
	readonly UPTIME_ROBOT_API_KEY?: string;
	readonly STATUS_API_KEY?: string;
	readonly SITE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
