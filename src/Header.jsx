import LWSLogo from './assets/lws-logo-en.svg';
const Header = () => {
  return (
    <nav className="py-6 md:py-8  w-full fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-x-6">
        <a href="/">
          <img className="h-[45px]" src={LWSLogo} alt="Lws" />
        </a>
      </div>
    </nav>
  );
};
export default Header;
