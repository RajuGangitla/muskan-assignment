
"use client";
import { Check, XOctagon, Clock } from 'lucide-react'; // Example icons. You can choose any icon set.
import { JiraIssue } from "@/types/jira";

interface IssuesProps {
    data: { issues: JiraIssue[] } | null;
    error: string | null;
}

export default function IssuesList({ data, error }: IssuesProps) {
    function statusColor(status: string): string {
        switch (status) {
            case "In Progress":
                return "bg-blue-500 hover:bg-blue-400";
            case "To Do":
                return "bg-gray-500 hover:bg-gray-400 text-white";
            case "Done":
                return "bg-green-500 hover:bg-green-400";
            default:
                return 'bg-gray-300 hover:bg-gray-200';
        }
    }

    function statusIcon(status: string) {
        switch (status) {
            case 'In Progress':
                return <Clock className="w-4 h-4 mr-1" />;
            case 'To Do':
                return <XOctagon className="w-4 h-4 mr-1" />;
            case 'Done':
                return <Check className="w-4 h-4 mr-1" />;
            default:
                return <Clock className="w-4 h-4 mr-1" />;
        }
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="bg-red-100 text-red-700 p-4 rounded-md">
                    <p className="text-lg font-semibold">There was an error:</p>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {data?.issues && data?.issues?.length > 0 ? (
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.issues.map((issue: JiraIssue) => (
                            <div key={issue.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <img src={issue.fields.issuetype.iconUrl} className="w-8 h-8" alt="Issue Type" />
                                        <p className="text-xl font-semibold text-gray-700">{issue.key}</p>
                                    </div>
                                    <div className={`inline-flex items-center text-white text-sm font-semibold px-3 py-1 rounded-md ${statusColor(issue.fields.status.name)}`}>
                                        {statusIcon(issue.fields.status.name)}
                                        {issue.fields.status.name}
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-4">{issue.fields.summary}</p>
                                {issue.fields.assignee && (
                                    <div className="flex items-center">
                                        <img src={issue.fields.assignee.avatarUrls["48x48"]} className="w-10 h-10 rounded-full" alt="Assignee" />
                                        <p className="text-gray-700 ml-3">{issue.fields.assignee.displayName}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">No issues found</p>
                </div>
            )}
        </>
    );
}
