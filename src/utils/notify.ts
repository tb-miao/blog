export interface NotificationOptions {
	title?: string;
	message: string;
	type?: 'info' | 'success' | 'warning' | 'error';
	duration?: number;
	closable?: boolean;
}

export interface WelcomeNotificationConfig {
	enable: boolean;
	title?: string;
	message: string;
	type?: 'info' | 'success' | 'warning' | 'error';
	duration?: number;
	closable?: boolean;
	delay?: number;
}

export interface NotificationStatus {
	initialized: boolean;
	containerReady: boolean;
	wrapperReady: boolean;
}

interface NotificationAPI {
	show: (options: NotificationOptions) => string;
	info: (message: string, title?: string) => string;
	success: (message: string, title?: string) => string;
	warning: (message: string, title?: string) => string;
	error: (message: string, title?: string) => string;
	close: (id: string) => void;
	setWelcomeConfig: (config: Partial<WelcomeNotificationConfig>) => void;
	getStatus: () => NotificationStatus;
	getQueueCount: () => number;
}

function getNotificationAPI(): NotificationAPI {
	if (typeof window !== 'undefined' && (window as any).notification) {
		return (window as any).notification;
	}
	return {
		show: () => '',
		info: () => '',
		success: () => '',
		warning: () => '',
		error: () => '',
		close: () => {},
		setWelcomeConfig: () => {},
		getStatus: () => ({ initialized: false, containerReady: false, wrapperReady: false }),
		getQueueCount: () => 0
	};
}

export const notify: NotificationAPI = {
	show: (options: NotificationOptions): string => {
		return getNotificationAPI().show(options);
	},
	info: (message: string, title?: string): string => {
		return getNotificationAPI().info(message, title);
	},
	success: (message: string, title?: string): string => {
		return getNotificationAPI().success(message, title);
	},
	warning: (message: string, title?: string): string => {
		return getNotificationAPI().warning(message, title);
	},
	error: (message: string, title?: string): string => {
		return getNotificationAPI().error(message, title);
	},
	close: (id: string): void => {
		getNotificationAPI().close(id);
	},
	setWelcomeConfig: (config: Partial<WelcomeNotificationConfig>): void => {
		getNotificationAPI().setWelcomeConfig(config);
	},
	getStatus: (): NotificationStatus => {
		return getNotificationAPI().getStatus();
	},
	getQueueCount: (): number => {
		return getNotificationAPI().getQueueCount();
	}
};

export default notify;
