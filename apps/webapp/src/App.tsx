import NavBar from 'components/navBar';
import Router from 'utils/routes';

const App = () => {
  return (
    <div className="App bg-slate-900 flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <Router />
      </div>
      <footer className="mt-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-200 sm:text-left">
            <span className="block sm:inline">&copy; 2023 Teamtartar</span>{' '}
            <span className="block sm:inline">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
