import React, { FC, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Button from '../../Atoms/Button';
import { IJob, JOB_TYPE, STATUS_TYPE } from '../../types/report';

const Container = styled.div`
  margin-top: 20px;
  position: relative;
`;

const CopyButton = styled(Button)`
  position: absolute;
  right: 3%;
  top: 26px;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 50vh;
  box-sizing: border-box;
  margin-top: 16px;
  background-color: var(--black-cool);
  border: 1px solid var(--white);
  border-radius: 6px;
  padding: 8px 12px;
  user-select: text;
  overflow: auto;
  resize: none;
  color: var(--white);
  font-size: 1.28em;
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
    }
    if ((grammarCnt === 2 && isOpen) || (grammarCnt > 1 && !isOpen))
      result += text[i];

    if (text[i] === ']') {
      isOpen = false;
    }
  }
  return result;
};

const Console: FC<IProps> = ({ jobs }) => {
  const [consoleValue, setConsoleValue] = useState('');

  const title = useMemo(() => {
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

  const flawJobs = useMemo(() => {
    const refers = jobs.filter(
      (j) => j.jobType === JOB_TYPE.FLAW && j.statusType === STATUS_TYPE.REFER,
    );
    const ings = jobs.filter(
      (j) => j.jobType === JOB_TYPE.FLAW && j.statusType === STATUS_TYPE.ING,
    );
    return `
> 결함처리
- 반려${refers.length > 0 ? ` (${refers.length}건)` : ''}
${
  refers && refers.length > 0
    ? refers
        .map((j, i) => `${j.text} ${getLabelMyNameAndProgress()}`)
        .join(`\n`)
    : `없음`
}

- 진행${ings.length > 0 ? ` (${ings.length}건)` : ''}
${
  ings && ings.length > 0
    ? ings
        .map((j, i) => `${j.text} ${getLabelMyNameAndProgress(j.progress)}`)
        .join(`\n`)
    : `없음`
}
      `;
  }, [jobs]);

  const siteJobs = useMemo(() => {
    const refers = jobs.filter(
      (j) => j.jobType === JOB_TYPE.SITE && j.statusType === STATUS_TYPE.REFER,
    );
    const ings = jobs.filter(
      (j) => j.jobType === JOB_TYPE.SITE && j.statusType === STATUS_TYPE.ING,
    );
    return `
> 사이트 지원
- 반려${refers.length > 0 ? ` (${refers.length}건)` : ''}
${
  refers && refers.length > 0
    ? refers
        .map(
          (j, i) =>
            `${getSiteReportText(j.text)} ${getLabelMyNameAndProgress()}`,
        )
        .join(`\n`)
    : `없음`
}

- 진행${ings.length > 0 ? ` (${ings.length}건)` : ''}
${
  ings && ings.length > 0
    ? ings
        .map(
          (j, i) =>
            `${getSiteReportText(j.text)} ${getLabelMyNameAndProgress(
              j.progress,
            )}`,
        )
        .join(`\n`)
    : `없음`
}`;
  }, [jobs]);

  useEffect(() => {
    const value = `${title}
${flawJobs}
${siteJobs}`;
    setConsoleValue(value);
  }, [title, siteJobs, flawJobs]);

  const copyClipBoard = () => {
    const textData = document.querySelector(
      '#report-console',
    ) as HTMLTextAreaElement;
    if (textData?.value) window.navigator.clipboard.writeText(textData.value);
  };

  return (
    <>
      <Container>
        <CopyButton color="orange" cb={copyClipBoard}>
          copy
        </CopyButton>
        <TextArea
          id="report-console"
          defaultValue={consoleValue}
          spellCheck={false}
        />
      </Container>
    </>
  );
};

export default Console;
