import React, { FC } from 'react';
import styled from 'styled-components';
import Button from '../../Atoms/Button';
import Input from '../../Atoms/Input';
import Select, { IOption } from '../../Atoms/Select';
import { JOB_TYPE_TITLE, STATUS_TYPE_TITLE } from '../../constants/report';
import { JOB_TYPE, PROGRESS, STATUS_TYPE } from '../../types/report';

const JobContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & > * {
    margin-right: 8px;
  }

  & > *:first-child {
    flex-grow: 1;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

interface IPROPS {
  text: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>, key: number) => void;
  onClickRemoveJob: (key: number) => void;
  key: number;
  jobType: JOB_TYPE;
  onChangeJobType: (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: number,
  ) => void;
  statusType: STATUS_TYPE;
  onChangeStatusType: (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: number,
  ) => void;
  progress?: typeof PROGRESS[number];
  onChangeProgress?: (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: number,
  ) => void;
}

const JOBTYPE_OPTIONS: IOption[] = Object.keys(JOB_TYPE).map((type) => ({
  text: JOB_TYPE_TITLE[type as keyof typeof JOB_TYPE],
  value: type,
}));

const STATUSTYPE_OPTIONS: IOption[] = Object.keys(STATUS_TYPE).map((type) => ({
  text: STATUS_TYPE_TITLE[type as keyof typeof STATUS_TYPE],
  value: type,
}));

const PROGRESS_OPTIONS: IOption[] = PROGRESS.map((p) => ({
  text: p,
  value: p,
}));

const Job: FC<IPROPS> = ({
  onBlur,
  text,
  onClickRemoveJob,
  key,
  jobType,
  onChangeJobType,
  statusType,
  onChangeStatusType,
  progress,
  onChangeProgress,
}) => {
  return (
    <JobContainer>
      <Input onBlur={(e) => onBlur(e, key)} value={text} />
      {/* 일감 타입 */}
      <Select
        options={JOBTYPE_OPTIONS}
        onChange={(e) => onChangeJobType(e, key)}
        selected={jobType}
      />
      {/* 현황 타입 */}
      <Select
        options={STATUSTYPE_OPTIONS}
        onChange={(e) => onChangeStatusType(e, key)}
        selected={statusType}
      />
      {/* 진행률 */}
      {statusType === STATUS_TYPE.ING && onChangeProgress && progress ? (
        <Select
          options={PROGRESS_OPTIONS}
          onChange={(e) => onChangeProgress(e, key)}
          selected={progress}
        />
      ) : (
        ''
      )}

      <Button cb={() => onClickRemoveJob(key)}>-</Button>
    </JobContainer>
  );
};

export default Job;
