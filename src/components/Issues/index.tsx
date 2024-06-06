"use client";

import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import Skeleton from "../loading/skeleton";
import { JiraResponse, statusOptions } from "@/types/jira";
import IssuesList from "./list";

const Issues = () => {
    const [issuesData, setIssuesData] = useState<JiraResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [page, setPage] = useState(1); // Start at page 1
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<string | undefined>(); // Status filter

    const fetchIssues = async (page: number, status?: string) => {
        setLoading(true); // Set loading to true when fetching starts
        try {
            const response: AxiosResponse<JiraResponse> = await axios.get(`/api/jiraIssues`, {
                params: {
                    page,
                    status,
                },
            });
            setIssuesData(response.data);
            setTotalPages(Math.ceil(response.data.total / 3)); // One result per page
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    const { status, statusText, data } = error.response;
                    setErrorMessage(`Error ${status}: ${statusText}. ${data.errorMessages ? data.errorMessages.join(', ') : ''}`);
                } else if (error.request) {
                    setErrorMessage('Error: Network issue or the server did not respond');
                } else {
                    setErrorMessage(`Error: ${error.message}`);
                }
            } else {
                setErrorMessage('An unexpected error occurred');
            }
        } finally {
            setLoading(false); // Set loading to false when fetching completes
        }
    };

    useEffect(() => {
        fetchIssues(page, statusFilter || undefined);
    }, [page, statusFilter]);

    return (
        <div>
            <div className="mt-12 flex items-start justify-start mb-4 ml-8">
                <select
                    className="p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <Skeleton />
            ) : (
                <IssuesList data={issuesData} error={errorMessage} />
            )}

            {
                issuesData?.issues && issuesData?.issues?.length > 0 && <div className="flex items-center justify-center mt-4">
                    <button
                        className={`mx-2 py-2 px-4 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}>
                        Previous
                    </button>
                    <span>Page {page} of {totalPages}</span>
                    <button
                        className={`mx-2 py-2 px-4 ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages}>
                        Next
                    </button>
                </div>
            }

        </div>
    );
};

export default Issues;

