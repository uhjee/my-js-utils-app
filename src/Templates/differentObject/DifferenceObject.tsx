import React, {FC, useCallback, useState} from 'react';
import styled from 'styled-components';
import Button from '../../Atoms/Button';
import {getDiffPropsDeepEqual} from '../../services/functions';
import stringify from 'json-stringify-pretty-compact';

const Container = styled.div``;
const TextAreaContainer = styled.div`
  height: 100%;
  display: flex;

  & > * {
    margin-right: 6px;

    &:last-child {
      margin-right: 0;
    }
  }
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 40vh;
  overflow: auto;
  resize: none;
`;
const ButtonBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 6px 0;
`;

const ResultContainer = styled.div`
  box-sizing: border-box;
  padding-top: 14px;
  background-color: var(--white);
  color: var(--black);
  height: 35vh;
  user-select: text;
  overflow: auto;
`;

interface IProps {
}

const DifferenceObject: FC<IProps> = () => {
  const [leftContent, setLeftContent] = useState('');
  const [rightContent, setRightContent] = useState('');
  const [resultContent, setResultContent] = useState('');

  const onBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>, type: 'L' | 'R') => {
      if (type === 'L')
        setLeftContent(e.target.value);
      else
        setRightContent(e.target.value);

    },
    [],
  );

  const compareObjects = useCallback(() => {
    try {
      leftContent.replaceAll('"', '/"');
      rightContent.replaceAll('"', '/"');

      const leftObj = JSON.parse(leftContent);
      const rightObj = JSON.parse(rightContent);

      if (typeof leftObj === 'object' && typeof rightObj === 'object') {
        setResultContent(stringify(getDiffPropsDeepEqual(leftObj, rightObj)));

      }
    } catch (error: any) {
      if (error.message && (error.message as string).includes('valid JSON')) {
        setResultContent('유효한 JSON 형식이 아니랍니다.');
      }
    }
  }, [leftContent, rightContent]);

  return (
    <Container>
      <TextAreaContainer>
        <TextArea onBlur={(e) => onBlur(e, 'L')}/>
        <TextArea onBlur={(e) => onBlur(e, 'R')}/>
      </TextAreaContainer>
      <ButtonBar>
        <Button color="orange" cb={compareObjects}>
          compare
        </Button>
      </ButtonBar>
      <ResultContainer>
        {resultContent}
        <br/>
        {leftContent}
        {rightContent}
        <div id="json-my"></div>
      </ResultContainer>
    </Container>
  );
};

export default DifferenceObject;
