import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 mt-20">
      <div className="w-full px-6 mx-auto">
        <div className="flex flex-wrap items-center -mx-3 lg:justify-between">
          <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
            <div className="text-sm leading-normal text-center text-slate-500 lg:text-left">
              Made with <i className="fa fa-heart text-pink-600"></i> by
              <a
                href="https://softleek.com/"
                className="font-semibold text-blue-700"
                target="_blank"
              >
                &nbsp;Softleek &nbsp;
              </a>
              for a better web.
            </div>
          </div>
          <div className="w-full max-w-full px-3 mt-0 shrink-0 lg:w-1/2 lg:flex-none">
            <ul className="flex flex-wrap justify-center pl-0 mb-0 list-none lg:justify-end">
              <li className="nav-item">
                <a
                  href="https://softleek.com/"
                  className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                  target="_blank"
                >
                  Softleek
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://softleek.com/"
                  className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://arifahub.com"
                  className="block px-4 pt-0 pb-1 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                  target="_blank"
                >
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/"
                  className="block px-4 pt-0 pb-1 pr-0 text-sm font-normal transition-colors ease-soft-in-out text-slate-500"
                  target="_blank"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
