import React, { FC, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import Button from '../../Atoms/Button';
import { IJob, JOB_TYPE, STATUS_TYPE } from '../../types/report';

const Container = styled.div`
  margin-top: 20px;
  background-color: var(--black-cool);
  border: 1px solid var(--white);
  border-radius: 6px;
  padding: 8px 12px;
  user-select: text;
`;

interface IProps {
  jobs: IJob[];
}

const getLabelMyNameAndProgress = (progress?: string) => {
  return `(허지행${!!progress ? ', ' + progress : ''})`;
};

const getSiteReportText = (text: string) => {
  let result = '';

  let grammarCnt = 0;
  let isOpen = false;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '[') {
      grammarCnt++;
      isOpen = true;
    } else if (text[i] === ']') {
      isOpen = false;
    }
    if ((grammarCnt === 2 && isOpen) || (grammarCnt === 3 && !isOpen))
      result += text[i];
  }
  return result;
};

const Console: FC<IProps> = ({ jobs }) => {
  const flawJobs = useMemo(() => {
    const refers = jobs.filter(
      (j) => j.jobType === JOB_TYPE.FLAW && j.statusType === STATUS_TYPE.REFER,
    );
    const ings = jobs.filter(
      (j) => j.jobType === JOB_TYPE.FLAW && j.statusType === STATUS_TYPE.ING,
    );
    return (
      <>
        <div> &gt; 결함처리</div>
        <div>- 반려 {refers.length}건</div>
        {refers && refers.length > 0 ? (
          refers.map((j, i) => (
            <div key={i}>
              {j.text} {getLabelMyNameAndProgress()}
            </div>
          ))
        ) : (
          <div>없음</div>
        )}
        <br />
        <div>- 진행 {ings.length}건</div>
        {ings && ings.length > 0 ? (
          ings.map((j, i) => (
            <div key={i}>
              {j.text} {getLabelMyNameAndProgress(j.progress)}
            </div>
          ))
        ) : (
          <div>없음</div>
        )}
      </>
    );
  }, [jobs]);
  const siteJobs = useMemo(() => {
    const refers = jobs.filter(
      (j) => j.jobType === JOB_TYPE.SITE && j.statusType === STATUS_TYPE.REFER,
    );
    const ings = jobs.filter(
      (j) => j.jobType === JOB_TYPE.SITE && j.statusType === STATUS_TYPE.ING,
    );
    return (
      <>
        <div> &gt; 사이트 지원</div>
        <div>- 반려 {refers.length}건</div>
        {refers && refers.length > 0 ? (
          refers.map((j, i) => (
            <div key={i}>
              {getSiteReportText(j.text)} {getLabelMyNameAndProgress()}
            </div>
          ))
        ) : (
          <div>없음</div>
        )}
        <br />
        <div>- 진행 {ings.length}건</div>
        {ings && ings.length > 0 ? (
          ings.map((j, i) => (
            <div key={i}>
              {getSiteReportText(j.text)}{' '}
              {getLabelMyNameAndProgress(j.progress)}
            </div>
          ))
        ) : (
          <div>없음</div>
        )}
      </>
    );
  }, [jobs]);

  const getTitle = useCallback(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : (today.getMonth() + 1).toString();
    const d =
      today.getDate() < 10 ? `0${today.getDate()}` : today.getDate().toString();

    return `[${y}-${m}-${d} 일간보고]`;
  }, []);

  const copyClipBoard = () => {
    const textData = document.querySelector('#report')?.textContent;
    if (textData) window.navigator.clipboard.writeText(textData);
  };

  return (
    <>
      <Button color="orange" cb={copyClipBoard}>
        copy
      </Button>
      <Container id="report">
        {getTitle()} <br />
        <br />
        {flawJobs} <br />
        {siteJobs}
      </Container>
    </>
  );
};

export default Console;

