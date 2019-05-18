import React, { useState } from "react";
import styled, { css } from "styled-components";

import { Icon } from "antd";

import { Form, Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import AutoSave from "../../../libs/auto-save";

import {
  H3, H4, Hr2, Input, CheckBox, Radio,
} from "../../../ui";

import { Volume } from "../molecules/volume";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const save = async (values) => {
  console.log('Saving', values);
  await sleep(2000);
};

export const Settings = () => {
  const [trialTimeMode, setTrialTimeMode] = useState("static");
  return (
    <Form
      onSubmit={save}
      initialValues={
        {
          trialTimeMode: "static",
          trialTimeMs: "3000",
          timeInitialMs: "3000",
          timeIncrementMs: "100",
          trialsNumber: "20",
          trialsFactor: "1",
          trialsExponent: "2",
          thresholdAdvance: "80",
          thresholdFallback: "50",
          thresholdFallbackCount: "3",
          volume: 60,
          feedbackOnError: true,
          feedbackOnKeyPress: true,
        }
      }
      render={({ handleSubmit, pristine, invalid }) => (
        <form onSubmit={handleSubmit}>
          <H3>Settings</H3>
          <H4>Trial time</H4>
          <FormGroup>
            <Field name="trialTimeMode" type="radio" value="static">
              {({ input, meta }) => (
                <Radio {...input} label="Static" />
              )}
            </Field>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Field name="trialTimeMode" type="radio" value="dynamic">
              {({ input, meta }) => (
                <Radio {...input} label="Dynamic" />
              )}
            </Field>
          </FormGroup>
          <OnChange name="trialTimeMode">
            {(value, previous) => {
              setTrialTimeMode(value);
            }}
          </OnChange>
          <HideBox isHidden={(trialTimeMode !== "static")}>
            <span>Trial time (ms):&nbsp;</span>
            <InputBox width="72px">
              <Field name="trialTimeMs">
                {({ input, meta }) => (
                  <Input {...input} type="number" />
                )}
              </Field>
            </InputBox>
            <br />
          </HideBox>
          <HideBox isHidden={(trialTimeMode === "static")}>
            <span>Time initial (ms):&nbsp;</span>
            <InputBox width="72px">
              <Field name="timeInitialMs">
                {({ input, meta }) => (
                  <Input {...input} type="number" />
                )}
              </Field>
            </InputBox>
            <br />
            <span>Increment (ms):&nbsp;</span>
            <InputBox width="72px">
              <Field name="timeIncrementMs">
                {({ input, meta }) => (
                  <Input {...input} type="number" />
                )}
              </Field>
            </InputBox>
          </HideBox>
          <Hr2 />
          <H4>
            Number of trials&nbsp;
            <Icon type="question-circle" theme="filled" style={{ fontSize: '18px' }} />
          </H4>
          <div>number - factor - exponent:</div>
          <InputBox width="52px">
            <Field name="trialsNumber">
              {({ input, meta }) => (
                <Input {...input} type="number" />
              )}
            </Field>
          </InputBox>
          &nbsp;-&nbsp;
          <InputBox width="52px">
            <Field name="trialsFactor">
              {({ input, meta }) => (
                <Input {...input} type="number" />
              )}
            </Field>
          </InputBox>
          &nbsp;-&nbsp;
          <InputBox width="52px">
            <Field name="trialsExponent">
              {({ input, meta }) => (
                <Input {...input} type="number" />
              )}
            </Field>
          </InputBox>
          <Hr2 />
          <H4>
            Thresholds&nbsp;
            <Icon type="question-circle" theme="filled" style={{ fontSize: '18px' }} />
          </H4>
          <span>Threshold advance:&nbsp;</span>
          <InputBox width="65px">
            <Field name="thresholdAdvance">
              {({ input, meta }) => (
                <Input {...input} type="number" />
              )}
            </Field>
          </InputBox>
          <span>Threshold fallback:&nbsp;</span>
          <InputBox width="65px">
            <Field name="thresholdFallback">
              {({ input, meta }) => (
                <Input {...input} type="number" />
              )}
            </Field>
          </InputBox>
          <span>Fallback count:&nbsp;</span>
          <InputBox width="65px">
            <Field name="thresholdFallbackCount">
              {({ input, meta }) => (
                <Input {...input} type="number" />
              )}
            </Field>
          </InputBox>
          <Hr2 />
          <H4>Feedback</H4>
          <Field name="feedbackOnError" type="checkbox">
            {({ input, meta }) => (
              <CheckBox {...input} label="Show feedback on error" />
            )}
          </Field>
          <Field name="feedbackOnKeyPress" type="checkbox">
            {({ input, meta }) => (
              <CheckBox {...input} label="Show feedback on key press" />
            )}
          </Field>
          <Hr2 />
          <Field name="volume">
            {({ input, meta }) => (
              <Volume {...input} defaultValue={60} />
            )}
          </Field>
          <AutoSave debounce={1000} save={save} opacity={0.5} />
        </form>
      )}
    />
  );
};

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const InputBox = styled.div`
  ${p => css`width: ${p.width};`}
  display: inline-block;
`;

const HideBox = styled.div`
  ${p => p.isHidden && "display: none;"}
`;
