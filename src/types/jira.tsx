
export interface JiraFields {
    summary: string;
    status: {
        name: string;
    };
    issuetype: {
        iconUrl: string;
    };
    assignee?: {
        displayName: string;
        avatarUrls: {
            "48x48": string;
        };
    };
}

export interface JiraIssue {
    id: string;
    key: string;
    fields: JiraFields;
}

export interface JiraResponse {
    issues: JiraIssue[];
    total: number
}

export const statusOptions = [
    { label: "All Statuses", value: "" },
    { label: "To Do", value: "To Do" },
    { label: "In Progress", value: "In Progress" },
    { label: "Done", value: "Done" }
];
