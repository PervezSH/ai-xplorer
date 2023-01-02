import React, { useState } from 'react';
import ParamSlider from '../../components/ParamSlider';
import Image from 'next/image';
import styles from '../../styles/pages/Compare.module.scss';

const Compare: React.FC = () => {
    const [temperature, setTemperature] = useState<number>(0.5);
    const [topP, setTopP] = useState<number>(0.5);
    const [frequencyPenalty, setFrequencyPenalty] = useState<number>(1);
    const [presencePenalty, setPresencePenalty] = useState<number>(1);
    const [bestOf, setBestOf] = useState<number>(10);
    const [prompt, setPrompt] = useState<string>("");
    const [models, setModels] = useState<ModelProps[]>([
        {
            name: "text-davinci-003",
            tokens: 2000,
            maxTokens: 4000,
            maxCreditUsage: 0,
            elaspedTime: 0,
            output: ""
        }
    ]);

    const updateModelProps = (index: number, model: ModelProps) => {
        setModels(prevModels => {
            const updatedModels = [...prevModels];
            updatedModels[index] = model;
            return updatedModels;
        });
    };

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
            {models.map((model, index) => (
                <div key={model.name} className={styles.row}>
                    <div>
                        <input disabled={true} type="text" placeholder="Output" value={model.output} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            updateModelProps(index, { ...model, output: event.target.value });
                        }} />
                        <p>4 prompt + 81 completion = 85 tokens ($0.002)</p>
                    </div>
                    <div>
                        <button>text-davinci-003</button>
                        <ParamSlider name="Max Tokens" value={model.tokens} minValue={1} maxValue={model.maxTokens} step={1} setValue={(value: number) => {
                            updateModelProps(index, { ...model, tokens: value });
                        }} />
                        <div>
                            <p>Max Credit Usage</p>
                            <p>0.002$</p>
                        </div>
                        <div>
                            <p>Elapsed Time</p>
                            <p>0.689 seconds</p>
                        </div>
                    </div>
                </div>
            ))}
            <button>Add another model</button>
        </div>
    );
}

export default Compare;