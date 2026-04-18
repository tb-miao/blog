export interface CommitItem {
	id: string;
	hash: string;
	parentHashes?: string[];
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
	isLatest?: boolean;
	isFirst?: boolean;
	isLast?: boolean;
	hasChild?: boolean;
	branchLevel?: number;
}
