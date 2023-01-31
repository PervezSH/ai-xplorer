import React, { useEffect, useState } from "react";
import type { GetStaticProps } from "next";
import Image from "next/image";
import { Caveat } from "@next/font/google";

import ParamSlider from "../../components/ParamSlider";
import config from "../../config";
import { IModelDetails } from "../../utils/model-data";
import styles from "../../styles/pages/Compare.module.scss";
import { useApiKey } from "../../context/ApiKeyContext";
import Dropdown from "../../components/Dropdown";

const caveat = Caveat({ subsets: ["latin"] });

type Props = {
  gpt3Models: IModelDetails[];
};

const Compare = ({ gpt3Models }: Props) => {
  const { apiKey } = useApiKey();

  const modelOptions = gpt3Models.map((model) => model.id);

  const [temperature, setTemperature] = useState<number>(0.7);
  const [topP, setTopP] = useState<number>(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState<number>(0);
  const [presencePenalty, setPresencePenalty] = useState<number>(0);
  const [bestOf, setBestOf] = useState<number>(1);
  const [prompt, setPrompt] = useState<string>("");
  const [modelsToCompare, setModelsToCompare] = useState<ICompareInfo[]>([
    {
      name: gpt3Models[0].id,
      maxTokens: gpt3Models[0].max,
      tokens: 256,
      maxCreditUsage: 0,
      creditUsage: 0,
      elapsedTime: 0,
      output: "",
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
    },
  ]);

  const [isCompleting, setIsCompleting] = useState<boolean>(false);

  const updateCompareInfo = (index: number, model: ICompareInfo) => {
    setModelsToCompare((prevModels) => {
      const updatedModels = [...prevModels];
      updatedModels[index] = model;
      return updatedModels;
    });
  };

  const handleModelChange = (atIndex: number, toModelWithName: string) => {
    const modelExists = modelsToCompare.some(
      (model) => model.name === toModelWithName
    );
    if (modelExists) return;
    const gpt3model = gpt3Models.find((model) => model.id === toModelWithName);
    if (gpt3model) {
      updateCompareInfo(atIndex, {
        name: gpt3model.id,
        maxTokens: gpt3model.max,
        tokens: 256,
        maxCreditUsage: 0,
        creditUsage: 0,
        elapsedTime: 0,
        output: "",
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      });
    }
  };

  const addModelToCompare = () => {
    const modelsAvaiableToCompare = gpt3Models.filter(
      (model) =>
        !modelsToCompare.some(
          (modelToCompare) => modelToCompare.name === model.id
        )
    );
    if (modelsAvaiableToCompare.length === 0) return;
    setModelsToCompare((prevModels) => {
      const updatedModels = [...prevModels];
      updatedModels.push({
        name: modelsAvaiableToCompare[0].id,
        maxTokens: modelsAvaiableToCompare[0].max,
        tokens: 256,
        maxCreditUsage: 0,
        creditUsage: 0,
        elapsedTime: 0,
        output: "",
        promptTokens: 0,
        completionTokens: 0,
        totalTokens: 0,
      });
      return updatedModels;
    });
  };

  const removeModelFromCompare = (name: string) => {
    setModelsToCompare((prevModels) => {
      const updatedModels = [...prevModels];
      const index = updatedModels.findIndex((model) => model.name === name);
      updatedModels.splice(index, 1);
      return updatedModels;
    });
  };

  const callCompletionEndpoint = async () => {
    if (apiKey === "" || prompt === "" || isCompleting) return;
    setIsCompleting(true);

    const response = await fetch("/api/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey: apiKey,
        modelsToCompare: modelsToCompare,
        prompt: prompt,
        temperature: temperature,
        topP: topP,
        presencePenalty: presencePenalty,
        frequencyPenalty: frequencyPenalty,
        bestOf: bestOf,
      }),
    });

    const data = await response.json();
    if (data.output) {
      data.output.forEach((result: ICompletionResult) => {
        const index = modelsToCompare.findIndex(
          (model) => model.name === result.modelName
        );
        const gpt3model = gpt3Models.find(
          (model) => model.id === result.modelName
        );
        if (gpt3model === undefined) return;
        updateCompareInfo(index, {
          ...modelsToCompare[index],
          maxCreditUsage:
            modelsToCompare[index].tokens * gpt3model.pricePerToken,
          elapsedTime: result.elapsedTime / 1000,
          output: result.outputText ? result.outputText : "",
          promptTokens: result.promptTokens ? result.promptTokens : 0,
          completionTokens: result.completionTokens
            ? result.completionTokens
            : 0,
          totalTokens: result.totalTokens ? result.totalTokens : 0,
          creditUsage: result.totalTokens
            ? result.totalTokens * gpt3model.pricePerToken
            : 0,
        });
      });
    } else {
      data.statusCode === 401
        ? console.warn("Please enter a valid API key!")
        : console.warn("Something went wrong!");
    }
    setIsCompleting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles["slider-wrapper"]}>
          <ParamSlider
            name="Temperature"
            value={temperature}
            minValue={0}
            maxValue={1}
            step={0.01}
            setValue={setTemperature}
          />
          <ParamSlider
            name="Top P"
            value={topP}
            minValue={0}
            maxValue={1}
            step={0.01}
            setValue={setTopP}
          />
          <ParamSlider
            name="Frequency Penalty"
            value={frequencyPenalty}
            minValue={0}
            maxValue={2}
            step={0.01}
            setValue={setFrequencyPenalty}
          />
          <ParamSlider
            name="Presence Penalty"
            value={presencePenalty}
            minValue={0}
            maxValue={2}
            step={0.01}
            setValue={setPresencePenalty}
          />
          <ParamSlider
            name="Best of"
            value={bestOf}
            minValue={1}
            maxValue={20}
            step={1}
            setValue={setBestOf}
          />
        </div>
        <textarea
          className={styles["text-input"]}
          placeholder="Enter you prompt here"
          value={prompt}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setPrompt(event.target.value);
          }}
        />
      </div>
      <div className={styles["btn-section"]}>
        <div>
          <p className={caveat.className}>Tokens</p>
          <div>{`${`0`}`}</div>
        </div>
        <div>
          {/* <Image src="/images/undo.png" alt="undo" width={32} height={32} />
          <Image
            src="/images/regenerate.png"
            alt="regenerate"
            width={32}
            height={32}
          /> */}
          <button
            className={styles["btn-primary"]}
            disabled={isCompleting}
            onClick={() => callCompletionEndpoint()}
          >
            Submit
          </button>
        </div>
      </div>
      {modelsToCompare.map((model, index) => (
        <div key={model.name}>
          <div className={styles.row}>
            <div className={styles["output-wrapper"]}>
              <textarea
                className={styles["text-output"]}
                disabled={true}
                placeholder="Output"
                value={model.output}
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                  updateCompareInfo(index, {
                    ...model,
                    output: event.target.value,
                  });
                }}
              />
              <p className={caveat.className}>{`${
                model.promptTokens
              } prompt + ${model.completionTokens} completion = ${
                model.totalTokens
              } tokens ($${model.creditUsage.toFixed(4)})`}</p>
            </div>
            <div className={styles["output-info-wrapper"]}>
              <Dropdown
                selectedOption={model.name}
                options={modelOptions}
                modelIndex={index}
                onSelect={handleModelChange}
              />
              <ParamSlider
                name="Max Tokens"
                value={model.tokens}
                minValue={1}
                maxValue={model.maxTokens}
                step={1}
                setValue={(value: number) => {
                  updateCompareInfo(index, { ...model, tokens: value });
                }}
              />
              <div className={styles["details-container"]}>
                <div>
                  <Image
                    src="/images/dollar.png"
                    alt="dollar"
                    width={24}
                    height={24}
                  />
                  <p className={caveat.className}>Max Credit Usage</p>
                </div>
                <p>{`${model.maxCreditUsage.toFixed(3)} $`}</p>
              </div>
              <div className={styles["details-container"]}>
                <div>
                  <Image
                    src="/images/clock.png"
                    alt="clock"
                    width={24}
                    height={24}
                  />
                  <p className={caveat.className}>Elapsed Time</p>
                </div>
                <p>{`${model.elapsedTime.toFixed(3)} seconds`}</p>
              </div>
              <button
                className={styles["btn-secondary"]}
                onClick={() => removeModelFromCompare(model.name)}
              >
                Close
              </button>
            </div>
          </div>
          <div className={styles["blank-space"]}></div>
        </div>
      ))}
      {modelsToCompare.length < gpt3Models.length && (
        <button className={styles["btn-secondary"]} onClick={addModelToCompare}>
          Add another model
        </button>
      )}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${config.url}/api/gpt3-models`);
  const gpt3Models = await res.json();

  return {
    props: {
      gpt3Models,
    },
  };
};

export default Compare;
