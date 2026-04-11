export interface CommitItem {
	id: string;
	hash: string;
	message: string;
	author: string;
	date: string;
	avatar?: string;
	changes: {
		additions: number;
		deletions: number;
	};
	files: string[];
	branch?: string;
	tags?: string[];
}

export interface CommitCardProps {
	item: CommitItem;
}
