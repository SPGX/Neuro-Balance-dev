import React, { useState } from 'react';
import { Link } from 'react-scroll';
import classNames from 'classnames';

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="fixed top-0 w-full h-20 bg-white shadow flex justify-between items-center px-6 z-[999] md:hidden">
        <div className="text-xl font-bold text-black">Neuro Balance</div>
        <button onClick={toggleMenu} className="relative w-8 h-6 flex flex-col justify-between">
          <span className={classNames("block h-1 bg-black transition-transform", open && "rotate-45 translate-y-2.5")}></span>
          <span className={classNames("block h-1 bg-black", open && "opacity-0")}></span>
          <span className={classNames("block h-1 bg-black transition-transform", open && "-rotate-45 -translate-y-2.5")}></span>
        </button>
      </div>

      <div
        className={classNames(
          "fixed top-20 right-0 w-64 h-[calc(100vh-80px)] bg-white z-[998] p-6 shadow-lg transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-6 text-right text-gray-800 font-medium text-base">
          <MobileLink to="about" label="Our Mission" close={closeMenu} />
          <MobileLink to="orcas" label="GEN ONE" close={closeMenu} />
          <MobileLink to="services" label="Services" close={closeMenu} />
          <MobileLink to="team" label="Team" close={closeMenu} />
          <MobileLink to="faq" label="FAQ" close={closeMenu} />
        </div>
      </div>
    </>
  );
}

function MobileLink({ to, label, close }) {
  return (
    <Link
      to={to}
      smooth={true}
      offset={-70}
      duration={500}
      className="cursor-pointer hover:text-cyan-600 transition"
      onClick={close}
    >
      {label}
    </Link>
  );
}
