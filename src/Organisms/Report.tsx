import { cloneDeep } from 'lodash';
import React, { FC, useState } from 'react';
import Button from '../Atoms/Button';
import Input from '../Atoms/Input';

const Report: FC = () => {
  const [jobs, setJobs] = useState<string[]>(['']);

  const onChange = (e: React.FocusEvent<HTMLInputElement>, key: number) => {
    const copied = cloneDeep(jobs);
    copied[key] = e.target.value;
    setJobs(copied);
  };

  const onClickAddJob = (e: React.MouseEvent<HTMLDivElement>) => {
    setJobs([...jobs, '']);
  };

  const onClickRemoveJob = (key: number) => {
    const copied = cloneDeep(jobs);
    copied.splice(key, 1);
    setJobs(copied);
  };
  return (
    <div>
      <Button cb={onClickAddJob}>+</Button>
      {jobs &&
        jobs.map((j, index) => (
          <div key={index}>
            <Input onChange={(e) => onChange(e, index)} />
            <Button cb={() => onClickRemoveJob(index)}>-</Button>
          </div>
        ))}

      {jobs.toString()}
    </div>
  );
};

export default Report;
