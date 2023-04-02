import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Bars3Icon,
  PlusIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "utils/common";
import { routes } from "const/routes";
import { useStytch, useStytchUser } from "@stytch/react";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stytch = useStytch();
  const { user } = useStytchUser();

  const navigation = [
    { name: "My Events", href: routes.HOME, current: false },
    { name: "Calendar", href: routes.CALENDAR, current: false },
  ];

  const handleLogout = async () => {
    await stytch.session.revoke();
    console.log("Logging out...");
    navigate(routes.LOGIN);
  };

  const newEventButton = () => {
    return location.pathname !== routes.NEW_EVENT ? (
      <button
        type="button"
        className="relative inline-flex items-center gap-x-1.5 rounded-md bg-emerald-500 mx-7 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        onClick={() => navigate(routes.NEW_EVENT)}
      >
        <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
        New Event
      </button>
    ) : null;
  };

  const profileImg = () => {
    /**
     TODO: Store profile img, when we decide to have User entity in DB
     1. Oauth profile img is unpredicatable, most people dont have one
     2. Even if we random generate, it will not be stored, so each render will random gen img
     3. We can generate avatar with user's firt/last name initials like google does (DH) david he
        but problem is, if user login with magic link, user info dont have first/last name.

     Solution eventually would be to have User entity, then user can SET a nickname and IMG for profile
     if this is something they care to. Otherwise we always just have email.
    */
    return <UserCircleIcon className="h-10 w-10 rounded-full" />;
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
          <Menu.Items className="absolute right-0 z-10 mt-2 min-w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames([
                    active ? "bg-gray-100" : "",
                    "block py-2 px-4 text-sm text-gray-700",
                  ])}
                >
                  <div className="flex items-center overflow-x-auto">
                    <div className="text-indigo-600">{profileImg()}</div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-800">
                        {user?.emails.length ? user.emails[0].email : "-"}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {user?.name
                          ? `${user.name.first_name} ${user.name.last_name}`
                          : "-"}
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
                    active ? "bg-gray-100" : "",
                    "block py-2 px-4 text-sm text-gray-700",
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
                ? "bg-indigo-700 text-white"
                : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
              "rounded-md py-2 px-3 text-sm font-medium",
            ])}
            aria-current={item.current ? "page" : undefined}
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
            ? "bg-indigo-700 text-white"
            : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
          "block rounded-md py-2 px-3 text-base font-medium",
        ])}
        aria-current={item.current ? "page" : undefined}
      >
        {item.name}
      </Disclosure.Button>
    ));
  };

  return (
    <Disclosure
      as="nav"
      className="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
              {/* Logo icon */}
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0 mr-12 lg:mr-3 md:mr-3">
                  <img
                    className="block h-8 w-8"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=300"
                    alt="Your Company"
                    onClick={() => navigate(routes.HOME)}
                  />
                </div>
                {newEventButton()}
              </div>
              {/* Mobile & Ipad menu button ||| or X */}
              {user ? (
                <>
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
                <button
                  type="button"
                  className="text-white hover:bg-indigo-500 hover:bg-opacity-75 block rounded-md py-2 px-3 text-base font-medium"
                  onClick={() => navigate(routes.LOGIN)}
                >
                  Login
                </button>
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
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium">
                    {user?.emails.length ? user.emails[0].email : "-"}
                  </p>
                  <p className="truncate text-sm">
                    {user?.name
                      ? `${user.name.first_name} ${user.name.last_name}`
                      : "-"}
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Disclosure.Button
                  as="span"
                  onClick={handleLogout}
                  className="block rounded-md py-2 px-3 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
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
