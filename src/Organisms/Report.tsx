import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Button from '../Atoms/Button';
import Console from '../Molecules/Report/Console';
import Job from '../Molecules/Report/Job';
import { IJob, JOB_TYPE, PROGRESS, STATUS_TYPE } from '../types/report';

const JobListContainer = styled.div`
  & > * {
    margin-bottom: 6px;

    & :last-child {
      margin: 0;
    }
  }
`;

const Report: FC = () => {
  const [jobs, setJobs] = useState<IJob[]>([
    {
      key: 0,
      text: '',
      jobType: JOB_TYPE.SITE,
      statusType: STATUS_TYPE.ING,
      progress: '완료',
    },
  ]);

  const onBlur = (e: React.FocusEvent<HTMLInputElement>, key: number) => {
    setJobs(
      jobs.map((j) => {
        if (j.key === key) {
          return {
            ...j,
            text: e.target.value.trim(),
          };
        }
        return j;
      }),
    );
  };

  const onClickAddJob = (e: React.MouseEvent<HTMLDivElement>) => {
    setJobs([
      ...jobs,
      {
        key: jobs[jobs.length - 1].key + 1,
        text: '',
        jobType: JOB_TYPE.SITE,
        statusType: STATUS_TYPE.ING,
        progress: '완료',
      },
    ]);
  };

  const onClickRemoveJob = (key: number) => {
    setJobs(jobs.filter((j) => j.key !== key));
  };

  const onChangeJobType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: number,
  ) => {
    setJobs(
      jobs.map((j) =>
        j.key === key ? { ...j, jobType: e.target.value as JOB_TYPE } : j,
      ),
    );
  };

  const onChangeStatusType = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: number,
  ) => {
    setJobs(
      jobs.map((j) =>
        j.key === key ? { ...j, statusType: e.target.value as STATUS_TYPE } : j,
      ),
    );
  };
  const onChangeProgress = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: number,
  ) => {
    setJobs(
      jobs.map((j) =>
        j.key === key
          ? { ...j, progress: e.target.value as typeof PROGRESS[number] }
          : j,
      ),
    );
  };
  return (
    <>
      <JobListContainer>
        <Button cb={onClickAddJob}>+</Button>

        {jobs &&
          jobs.map((j) => (
            <Job
              onBlur={(e) => onBlur(e, j.key)}
              text={j.text}
              onClickRemoveJob={() => onClickRemoveJob(j.key)}
              key={j.key}
              jobType={j.jobType}
              onChangeJobType={(e) => onChangeJobType(e, j.key)}
              statusType={j.statusType}
              onChangeStatusType={(e) => onChangeStatusType(e, j.key)}
              progress={j.progress}
              onChangeProgress={(e) => onChangeProgress(e, j.key)}
            />
          ))}
      </JobListContainer>
      <Console jobs={jobs} />
    </>
  );
};

export default Report;
