"use client";

import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

import "survey-core/survey-core.css";

interface TestRunnerProps {
  schema: string;
  onComplete: (answers: Record<string, unknown>) => void;
}

export default function TestRunner({
  schema,
  onComplete,
}: TestRunnerProps) {
  const survey = new Model(JSON.parse(schema));

  survey.onComplete.add((sender) => {
    onComplete(sender.data);
  });

  return <Survey model={survey} />;
}