import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bars3Icon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { classNames } from 'utils/common';
import { routes } from 'const/routes';
import { useStytch, useStytchUser } from '@stytch/react';
import Avatar from 'react-avatar';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stytch = useStytch();
  const { user } = useStytchUser();

  const navigation = [
    { name: 'My Events', href: routes.MY_EVENTS, current: false },
    { name: 'Calendar', href: routes.CALENDAR, current: false },
  ];

  const handleLogout = async () => {
    await stytch.session.revoke();
    console.log('Logging out...');
    navigate(routes.LOGIN);
  };

  const newEventButton = () => {
    return location.pathname !== routes.NEW_EVENT ? (
      <button
        type="button"
        className="relative inline-flex items-center gap-x-1.5 rounded-md bg-emerald-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        onClick={() => navigate(routes.NEW_EVENT)}
      >
        <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        New Event
      </button>
    ) : null;
  };

  const loginButton = () => {
    return location.pathname !== routes.LOGIN ? (
      <button
        type="button"
        className="text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium"
        onClick={() => navigate(routes.LOGIN)}
      >
        Login
      </button>
    ) : null;
  };

  const profileImg = () => {
    const email = user?.emails.length ? user.emails[0].email : '';
    const name = user?.name?.first_name
      ? `${user.name.first_name} ${user.name.middle_name} ${user.name.last_name}`
      : email;
    return <Avatar name={name} round={true} size="45" />;
  };

  const profileDropdown = () => {
    return (
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
            {profileImg()}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 min-w-[230px] origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hover:cursor-pointer">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames([
                    active ? 'bg-gray-100' : '',
                    'block py-2 px-4 text-sm text-gray-700',
                  ])}
                >
                  <div className="flex items-center overflow-x-auto">
                    <div className="mr-3">{profileImg()}</div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-800">
                        {user?.emails.length ? user.emails[0].email : '-'}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {user?.name
                          ? `${user.name.first_name} ${user.name.last_name}`
                          : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={handleLogout}
                  className={classNames([
                    active ? 'bg-gray-100' : '',
                    'block py-2 px-4 text-sm text-gray-700 hover:text-red-700',
                  ])}
                >
                  Log out
                </div>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    );
  };

  const navigationItemsDesktop = () => {
    return (
      <div className="mx-5">
        {navigation.map((item, idx) => (
          <a
            key={item.name + idx}
            href={item.href}
            className={classNames([
              item.current
                ? 'bg-indigo-700 text-white'
                : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
              'rounded-md py-2 px-3 text-sm font-medium',
            ])}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </a>
        ))}
      </div>
    );
  };

  const navigationItemsMobileIpad = () => {
    return navigation.map((item) => (
      <Disclosure.Button
        key={item.name}
        as="a"
        href={item.href}
        className={classNames([
          item.current
            ? 'bg-indigo-700 text-white'
            : 'text-white hover:bg-indigo-500 hover:bg-opacity-75',
          'block rounded-md py-2 px-3 text-base font-medium',
        ])}
        aria-current={item.current ? 'page' : undefined}
      >
        {item.name}
      </Disclosure.Button>
    ));
  };

  return (
    <Disclosure
      as="nav"
      className="border-b border-indigo-300 border-opacity-25 bg-indigo-800 lg:border-none"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
              {/* Logo icon */}
              <div className="flex items-center px-2 lg:px-0">
                <div
                  className="flex-shrink-0 mr-12 lg:mr-3 md:mr-3 hover:cursor-pointer text-white font-medium text-lg sm:text-2xl"
                  onClick={() => navigate(routes.HOME)}
                >
                  Teamtartar
                </div>
                {newEventButton()}
              </div>
              {user ? (
                <>
                  {/* Mobile & Ipad menu button ||| or X */}
                  <div className="flex lg:hidden">
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  {/* Desktop screen navigation items + profile icon dropdown */}
                  <div className="hidden lg:ml-4 lg:block">
                    <div className="flex items-center">
                      {navigationItemsDesktop()}
                      {profileDropdown()}
                    </div>
                  </div>
                </>
              ) : (
                loginButton()
              )}
            </div>
          </div>
          {/* Ipad or Mobile menu */}
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigationItemsMobileIpad()}
            </div>
            <div className="border-t border-indigo-700 pt-4 pb-3 text-gray-100">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">{profileImg()}</div>
                <div className="min-w-0 flex-1 text-left ml-4">
                  <p className="text-sm font-medium">
                    {user?.emails.length ? user.emails[0].email : '-'}
                  </p>
                  <p className="truncate text-sm">
                    {user?.name
                      ? `${user.name.first_name} ${user.name.last_name}`
                      : '-'}
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Disclosure.Button
                  as="span"
                  onClick={handleLogout}
                  className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75 hover:cursor-pointer"
                >
                  Log out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
