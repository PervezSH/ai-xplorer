import headerStyles from '../styles/components/Header.module.scss';

const Header = () => {
    return (
        <div className={headerStyles.container}>
            <div>Ai Xplorer</div>
            <div>Login</div>
        </div>
    );
}

export default Header;