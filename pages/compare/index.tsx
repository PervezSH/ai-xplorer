import React, { useEffect, useState } from 'react';
import type { GetStaticProps } from 'next';
import Image from 'next/image';
import ParamSlider from '../../components/ParamSlider';
import { server } from '../../config';
import type { ModelDetails } from '../../utils/model-data';
import styles from '../../styles/pages/Compare.module.scss';

type Props = {
    gpt3Models: ModelDetails[];
}

const Compare = ({ gpt3Models }: Props) => {
    const [temperature, setTemperature] = useState<number>(0.5);
    const [topP, setTopP] = useState<number>(0.5);
    const [frequencyPenalty, setFrequencyPenalty] = useState<number>(1);
    const [presencePenalty, setPresencePenalty] = useState<number>(1);
    const [bestOf, setBestOf] = useState<number>(10);
    const [prompt, setPrompt] = useState<string>("");
    const [modelsToCompare, setModelsToCompare] = useState<CompareInfo[]>([
        {
            name: gpt3Models[0].id,
            maxTokens: gpt3Models[0].max,
            tokens: 256,
            maxCreditUsage: 0,
            elaspedTime: 0,
            output: ""
        }
    ]);

    const updateModelProps = (index: number, model: CompareInfo) => {
        setModelsToCompare(prevModels => {
            const updatedModels = [...prevModels];
            updatedModels[index] = model;
            return updatedModels;
        });
    };

    const addModelToCompare = () => {
        setModelsToCompare(prevModels => {
            const updatedModels = [...prevModels];
            updatedModels.push({
                name: gpt3Models[modelsToCompare.length].id,
                maxTokens: gpt3Models[modelsToCompare.length].max,
                tokens: 256,
                maxCreditUsage: 0,
                elaspedTime: 0,
                output: ""
            });
            return updatedModels;
        });
    };

    useEffect(() => {
        console.log(gpt3Models);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <div>
                    <ParamSlider name="Temperature" value={temperature} minValue={0} maxValue={1} step={0.01} setValue={setTemperature} />
                    <ParamSlider name="Top P" value={topP} minValue={0} maxValue={1} step={0.01} setValue={setTopP} />
                    <ParamSlider name="Frequency Penalty" value={frequencyPenalty} minValue={0} maxValue={2} step={0.01} setValue={setFrequencyPenalty} />
                    <ParamSlider name="Presence Penalty" value={presencePenalty} minValue={0} maxValue={2} step={0.01} setValue={setPresencePenalty} />
                    <ParamSlider name="Best of" value={bestOf} minValue={1} maxValue={20} step={1} setValue={setBestOf} />
                </div>
                <input type="text" placeholder="Enter you prompt here" value={prompt} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPrompt(event.target.value);
                }} />
            </div >
            <div className={styles.row}>
                <p>Tokens</p>
                <p>0</p>
                <Image src="/images/arrow.svg" alt="Undo last" width={20} height={20} />
                <Image src="/images/arrow.svg" alt="Regenerate" width={20} height={20} />
                <button>Submit</button>
            </div>
            {modelsToCompare.map((model, index) => (
                <div key={model.name} className={styles.row}>
                    <div>
                        <input disabled={true} type="text" placeholder="Output" value={model.output} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            updateModelProps(index, { ...model, output: event.target.value });
                        }} />
                        <p>4 prompt + 81 completion = 85 tokens ($0.002)</p>
                    </div>
                    <div>
                        <select value={model.name}>
                            {gpt3Models.map(gpt3Model => (
                                <option key={gpt3Model.id} value={gpt3Model.id}>{gpt3Model.id}</option>
                            ))}
                        </select>
                        <ParamSlider name="Max Tokens" value={model.tokens} minValue={1} maxValue={model.maxTokens} step={1} setValue={(value: number) => {
                            updateModelProps(index, { ...model, tokens: value });
                        }} />
                        <div>
                            <p>Max Credit Usage</p>
                            <p>{`${model.maxCreditUsage} $`}</p>
                        </div>
                        <div>
                            <p>Elapsed Time</p>
                            <p>{`${model.elaspedTime} seconds`}</p>
                        </div>
                    </div>
                </div>
            ))}
            {modelsToCompare.length < gpt3Models.length &&
                <button onClick={addModelToCompare}>
                    Add another model
                </button>
            }
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const res = await fetch(`${server}/api/gpt3-models`);
    const gpt3Models = await res.json();

    return {
        props: {
            gpt3Models,
        }
    }
}

export default Compare;