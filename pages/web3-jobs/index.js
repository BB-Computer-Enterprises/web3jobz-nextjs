import { useState, useEffect } from "react";
import PageContainer from '@components/PageContainer';
import Link from 'next/link';
import { getAllJobs, getAllCompanies } from "@db/";
import {
    COMPANY_NAME,
    COMPANY_ICON_URL,
    JOB_APPLICATION_URL,
    JOB_TAGS,
    JOB_DESCRIPTION,
    JOB_LOCATION,
    JOB_TITLE,
    JOB_DATE_POSTED,
    JOB_ID,
    FEATURED_TEXT_STYLE,
    REGULAR_TEXT_STYLE,
    REGULAR_STYLE,
    ALL_JOBS_PAGE_TITLE
} from "@constants/*"

import { makeFriendlyUrl } from "@util/sanitize";
import { genListIcon } from "@util/genListIcon";

const AllJobsPage = allJobs => {
    const [errorText, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);


    const genJobs = jobData => {
        return (
            /**Do we want the jobs page to have the featured changes 
             *if the company had paid for featured? */
            jobData.map(job => (
                <div key={job[JOB_ID]} className={REGULAR_STYLE}>
                    <div className="lg:px-4 py-4 flex items-center">
                        {genListIcon()}
                        <div className="flex-1 pl-8 flex items-center justify-between">
                            <div>
                                <h1 className={REGULAR_TEXT_STYLE}>{job[JOB_TITLE]}</h1>
                                <p className="flex-shrink-0 font-normal text-white ">📅 Posted {job[JOB_DATE_POSTED]}</p>
                            </div>
                        </div>

                    </div>
                </div>
            ))
        )
    }
    const getContent = () => {
        return (
            <div className={`${isLoading ? "" : "shadow-2xl"} bg-gray-dark overflow-hidden rounded-md`}>
                {genJobs(allJobs.jobs)}
                {console.log(allJobs.company)}
            </div>
        )
    }

    return (
        PageContainer(getContent(), { title: ALL_JOBS_PAGE_TITLE, isShown: true })
    )

}

export default AllJobsPage;

export async function getServerSideProps() {
    let { data: jobs, jobError } = await getAllJobs();
    let {data: company, companyError} = await getAllCompanies();

    if (jobError || companyError) {
        setError(jobError ||companyError );
        return { notFound: true, }
    }
    else {
        //set loading false

        return {
            props: { 
                jobs,
                company }
        }
    }
}