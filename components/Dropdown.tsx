import { useState } from "react";
import Image from "next/image";
import styles from "../styles/components/Dropdown.module.scss";

interface DropdownProps {
  selectedOption: string;
  options: string[];
  modelIndex: number;
  onSelect: (modelIndex: number, optionName: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  selectedOption,
  options,
  modelIndex,
  onSelect,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (option: string) => {
    onSelect(modelIndex, option);
    setShowMenu(false);
  };

  return (
    <div className={styles["dropdown"]}>
      <button
        className={styles["selected-option"]}
        onClick={() => setShowMenu(!showMenu)}
      >
        {selectedOption}
        {showMenu ? (
          <Image
            src="/images/arrow-up.png"
            alt="arrow-up"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/images/arrow-down.png"
            alt="arrow-down"
            width={24}
            height={24}
          />
        )}
      </button>
      {showMenu && (
        <div className={styles["options"]}>
          {options.map((option, index) => (
            <button
              key={index}
              className={styles["btn-secondary"]}
              onClick={() => handleClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
