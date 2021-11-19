import { useState, useEffect } from "react";
import PageContainer from '@components/PageContainer';
import Link from 'next/link';
import { getAllJobs, getAllCompaniesInAlphabetic } from "@db/";
import {
    COMPANY_NAME,
    COMPANY_ICON_URL,
    COMPANY_ID,
    COMPANY_FEATURED,
    COMPANIES_URL,
    JOB_APPLICATION_URL,
    JOB_TAGS,
    JOB_DESCRIPTION,
    JOB_LOCATION,
    JOB_TITLE,
    JOB_DATE_POSTED,
    JOB_ID,
    FEATURED_TEXT_STYLE,
    FEATURED_STYLE,
    REGULAR_TEXT_STYLE,
    REGULAR_STYLE,
    REFER_URL,
    ALL_JOBS_PAGE_TITLE
} from "@constants/*"

import { makeFriendlyUrl } from "@util/sanitize";
import { genListIcon } from "@util/genListIcon";

const AllJobsPage = allJobs => {
    const [errorText, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const genUrlWithRefer = (job, company) => {
        const { [JOB_TITLE]: jName, [JOB_ID]: jId } = job;

        console.log("jURL", COMPANIES_URL);
        return `${COMPANIES_URL}/${makeFriendlyUrl(jName)}/${jId}`;
    }

    function getCompanyIconURL(jobData) {
        console.log("JOBID", allJobs.companies);
        let companyID, cIconUrl;
        for(let job in jobData){
           // console.log("JOBID", job);
           console.log("JOB.cId",jobData['cId']);
            //console.log("JOB",jobData[job]);
           companyID = jobData['cId'];
        }
        console.log("AJ's Companies: ",allJobs.companies[companyID])

        for(let company in allJobs.companies[companyID]){
            console.log("company HERE:",allJobs.companies[companyID]['cIconUrl'])
            cIconUrl = allJobs.companies[companyID]['cIconUrl'];
        }
      //  console.log("Company ID",companyID);
        return cIconUrl;

    }

    const genJobs = jobData => {

        return (
            /**Do we want the jobs page to have the featured changes 
             *if the company had paid for featured? */

            jobData.map(job => (
                <div key={job[JOB_ID]} className={REGULAR_STYLE}>
                    <Link passHref href={{ pathname: genUrlWithRefer(job) }}>

                        <div className="py-4 flex items-center">
                            {genListIcon(getCompanyIconURL(job),"",false)}
                            <div className="flex-1 pl-8 flex items-center justify-between">

                                <div>
                                    <h1 className={REGULAR_TEXT_STYLE}>{job[JOB_TITLE]}</h1>
                                    <p className="flex-shrink-0 font-normal text-white ">📅 Posted {job[JOB_DATE_POSTED]}</p>

                                </div>
                            </div>

                        </div>
                    </Link>
                </div>
            ))
        )
    }
    const getContent = () => {
        return (
            <div className={`${isLoading ? "" : "shadow-2xl"} bg-gray-dark overflow-hidden rounded-md`}>
                {genJobs(allJobs.jobs)}
                {console.log("jobs", allJobs.jobs)}

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
    let { data: companies, companyError } = await getAllCompaniesInAlphabetic();

    if (jobError || companyError) {
        setError(jobError || companyError);
        return { notFound: true, }
    }
    else {
        //set loading false

        return {
            props: {
                jobs,
                companies
            }
        }
    }
}