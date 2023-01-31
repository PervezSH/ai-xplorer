import React from "react";
import paramSilderStyles from "../styles/components/ParamSlider.module.scss";

type ParamSliderProps = {
  name: string;
  value: number;
  minValue: number;
  maxValue: number;
  step: number;
  setValue: (value: number) => void;
};

const ParamSlider = ({
  name,
  value,
  minValue,
  maxValue,
  step,
  setValue,
}: ParamSliderProps) => {
  return (
    <div className={paramSilderStyles.container}>
      <div className={paramSilderStyles.head}>
        <p>{name}</p>
        <div>{value}</div>
      </div>
      <div className={paramSilderStyles.track}>
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={value}
          step={step}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(Number(event.target.value));
          }}
        />
        <div
          style={{
            width: `${((value - minValue) / (maxValue - minValue)) * 100}%`,
          }}
          className={paramSilderStyles.fill}
        ></div>
      </div>
    </div>
  );
};

export default ParamSlider;
