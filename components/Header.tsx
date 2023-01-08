import headerStyles from '../styles/components/Header.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import { useApiKey } from '../context/ApiKeyContext';

const Header = () => {
    const { apiKey, setApiKey } = useApiKey();
    const [keyEntered, setKeyEntered] = useState<boolean>(apiKey.length > 0 ? true : false);
    const [inUpdateMode, setInUpdateMode] = useState<boolean>(apiKey.length > 0 ? false : true);

    return (
        <div className={headerStyles.container}>
            <div>Ai Xplorer</div>
            <div className={headerStyles["api-key-container"]}>
                <button
                    className={headerStyles["api-key-button"]}
                    onClick={() => {
                        apiKey.length > 0 ? setKeyEntered(true) : setKeyEntered(false)
                        setInUpdateMode(true);
                    }}
                >
                    <Image src="/images/key.png" alt="Key" width={20} height={20} />
                    <p>{(keyEntered && apiKey.length > 0) ? `${apiKey}` : `Add API Key`}</p>
                </button>
                {(inUpdateMode && keyEntered) && (
                    <div>
                        <p>You already entered you OpenAI API key</p>
                        <button onClick={() => setKeyEntered(false)}>Change Key</button>
                    </div>
                )}
                {(inUpdateMode && !keyEntered) && (
                    <div>
                        <p>To get started, add your OpenAI API Key!</p>
                        <input
                            type="text"
                            placeholder="Enter here..."
                            value={apiKey}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setApiKey(event.target.value);
                            }}
                        />
                        <button onClick={() => {
                            if (apiKey.length === 0) return;
                            setKeyEntered(true);
                            setInUpdateMode(false);
                        }}>Add key</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;