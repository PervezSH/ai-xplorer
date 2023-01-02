import React from 'react';
import paramSilderStyles from '../styles/components/ParamSlider.module.scss';

type ParamSliderProps = {
    name: string;
    value: number;
    minValue: number;
    maxValue: number;
    step: number;
    setValue: (value: number) => void;
}

const ParamSlider: React.FC<ParamSliderProps> = ({ name, value, minValue, maxValue, step, setValue }) => {
    return (
        <div className={paramSilderStyles.container}>
            <div>
                <p>{name}</p>
                <p>{value}</p>
            </div>
            <input type="range" min={minValue} max={maxValue} value={value} step={step} onChange={
                (event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(Number(event.target.value));
                }
            } />
        </div>
    );
}

export default ParamSlider;