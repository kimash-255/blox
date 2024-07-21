import React from "react";

const Row4 = () => {
  return (
    <div className="flex flex-wrap my-6 px-4">
      <div className="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:w-1/2 md:flex-none lg:w-2/3 lg:flex-none">
        <div className="border-black/12.5 shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
          <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
            <div className="flex flex-wrap mt-0 -mx-3">
              <div className="flex-none w-7/12 max-w-full px-3 mt-0 lg:w-1/2 lg:flex-none">
                <h6>Projects</h6>
                <p className="mb-0 text-sm leading-normal">
                  <i className="fa fa-check text-cyan-500"></i>
                  <span className="ml-1 font-semibold">30 done</span>
                  this month
                </p>
              </div>
              <div className="flex-none w-5/12 max-w-full px-3 my-auto text-right lg:w-1/2 lg:flex-none">
                <div className="relative pr-6 lg:float-right">
                  <a className="cursor-pointer" aria-expanded="false">
                    <i className="fa fa-ellipsis-v text-slate-400"></i>
                  </a>
                  <p className="hidden transform-dropdown-show"></p>

                  <ul className="z-100 text-sm transform-dropdown shadow-soft-3xl duration-250 before:duration-350 before:font-awesome before:ease-soft min-w-44 -ml-34 before:text-5.5 pointer-events-none absolute top-0 m-0 mt-2 list-none rounded-lg border-0 border-solid border-transparent bg-white bg-clip-padding px-2 py-4 text-left text-slate-500 opacity-0 transition-all before:absolute before:top-0 before:right-7 before:left-auto before:z-40 before:text-white before:transition-all before:content-['\f0d8']">
                    <li className="relative">
                      <a className="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg border-0 bg-transparent px-4 text-left font-normal text-slate-500 lg:transition-colors lg:duration-300">
                        Action
                      </a>
                    </li>
                    <li className="relative">
                      <a className="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg border-0 bg-transparent px-4 text-left font-normal text-slate-500 lg:transition-colors lg:duration-300">
                        Another action
                      </a>
                    </li>
                    <li className="relative">
                      <a className="py-1.2 lg:ease-soft clear-both block w-full whitespace-nowrap rounded-lg border-0 bg-transparent px-4 text-left font-normal text-slate-500 lg:transition-colors lg:duration-300">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-auto p-6 px-0 pb-2">
            <div className="overflow-x-auto">
              <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    <th className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                      Companies
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                      Members
                    </th>
                    <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                      Budget
                    </th>
                    <th className="px-6 py-3 font-bold tracking-normal text-center uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70">
                      Completion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="flex px-2 py-1">
                        <div>
                          <img
                            src="/img/small-logos/logo-xd.svg"
                            className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                            alt="xd"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h6 className="mb-0 text-sm leading-normal">
                            Soft UI XD Version
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="mt-2 avatar-group">
                        <a className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30">
                          <img
                            src="/img/team-1.jpg"
                            className="w-full rounded-full"
                            alt="team1"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Ryan Tompson
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-2.jpg"
                            className="w-full rounded-full"
                            alt="team2"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Romina Hadid
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-3.jpg"
                            className="w-full rounded-full"
                            alt="team3"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Alexander Smith
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-4.jpg"
                            className="w-full rounded-full"
                            alt="team4"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Jessica Doe
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap">
                      <span className="text-xs font-semibold leading-tight">
                        {" "}
                        $14,000{" "}
                      </span>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="w-3/4 mx-auto">
                        <div>
                          <div>
                            <span className="text-xs font-semibold leading-tight">
                              60%
                            </span>
                          </div>
                        </div>
                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                          <div
                            className="duration-600 ease-soft bg-gradient-to-tl from-blue-600 to-cyan-400 -mt-0.38 -ml-px flex h-1.5 w-3/5 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all"
                            role="progressbar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="flex px-2 py-1">
                        <div>
                          <img
                            src="/img/small-logos/logo-atlassian.svg"
                            className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                            alt="atlassian"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h6 className="mb-0 text-sm leading-normal">
                            Add Progress Track
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="mt-2 avatar-group">
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-2.jpg"
                            className="w-full rounded-full"
                            alt="team5"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Romina Hadid
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-4.jpg"
                            className="w-full rounded-full"
                            alt="team6"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Jessica Doe
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap">
                      <span className="text-xs font-semibold leading-tight">
                        {" "}
                        $3,000{" "}
                      </span>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="w-3/4 mx-auto">
                        <div>
                          <div>
                            <span className="text-xs font-semibold leading-tight">
                              10%
                            </span>
                          </div>
                        </div>
                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                          <div
                            className="duration-600 ease-soft bg-gradient-to-tl from-blue-600 to-cyan-400 -mt-0.38 w-1/10 -ml-px flex h-1.5 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all"
                            role="progressbar"
                            aria-valuenow="10"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="flex px-2 py-1">
                        <div>
                          <img
                            src="/img/small-logos/logo-slack.svg"
                            className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                            alt="team7"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h6 className="mb-0 text-sm leading-normal">
                            Fix Platform Errors
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="mt-2 avatar-group">
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-3.jpg"
                            className="w-full rounded-full"
                            alt="team8"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Romina Hadid
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-1.jpg"
                            className="w-full rounded-full"
                            alt="team9"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Jessica Doe
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap">
                      <span className="text-xs font-semibold leading-tight">
                        {" "}
                        Not set{" "}
                      </span>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="w-3/4 mx-auto">
                        <div>
                          <div>
                            <span className="text-xs font-semibold leading-tight">
                              100%
                            </span>
                          </div>
                        </div>
                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                          <div
                            className="duration-600 ease-soft bg-gradient-to-tl from-green-600 to-lime-400 -mt-0.38 -ml-px flex h-1.5 w-full flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all"
                            role="progressbar"
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="flex px-2 py-1">
                        <div>
                          <img
                            src="/img/small-logos/logo-spotify.svg"
                            className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                            alt="spotify"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h6 className="mb-0 text-sm leading-normal">
                            Launch our Mobile App
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="mt-2 avatar-group">
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-4.jpg"
                            className="w-full rounded-full"
                            alt="user1"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Ryan Tompson
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-3.jpg"
                            className="w-full rounded-full"
                            alt="user2"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Romina Hadid
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-4.jpg"
                            className="w-full rounded-full"
                            alt="user3"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Alexander Smith
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-1.jpg"
                            className="w-full rounded-full"
                            alt="user4"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Jessica Doe
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap">
                      <span className="text-xs font-semibold leading-tight">
                        {" "}
                        $20,500{" "}
                      </span>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="w-3/4 mx-auto">
                        <div>
                          <div>
                            <span className="text-xs font-semibold leading-tight">
                              100%
                            </span>
                          </div>
                        </div>
                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                          <div
                            className="duration-600 ease-soft bg-gradient-to-tl from-green-600 to-lime-400 -mt-0.38 -ml-px flex h-1.5 w-full flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all"
                            role="progressbar"
                            aria-valuenow="100"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="flex px-2 py-1">
                        <div>
                          <img
                            src="/img/small-logos/logo-jira.svg"
                            className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                            alt="jira"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h6 className="mb-0 text-sm leading-normal">
                            Add the New Pricing Page
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="mt-2 avatar-group">
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-4.jpg"
                            className="w-full rounded-full"
                            alt="user5"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Ryan Tompson
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap">
                      <span className="text-xs font-semibold leading-tight">
                        {" "}
                        $500{" "}
                      </span>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                      <div className="w-3/4 mx-auto">
                        <div>
                          <div>
                            <span className="text-xs font-semibold leading-tight">
                              25%
                            </span>
                          </div>
                        </div>
                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                          <div
                            className="duration-600 ease-soft bg-gradient-to-tl from-blue-600 to-cyan-400 -mt-0.38 -ml-px flex h-1.5 w-1/4 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all"
                            role="progressbar"
                            aria-valuenow="25"
                            aria-valuemin="0"
                            aria-valuemax="25"
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
                      <div className="flex px-2 py-1">
                        <div>
                          <img
                            src="/img/small-logos/logo-invision.svg"
                            className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                            alt="invision"
                          />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h6 className="mb-0 text-sm leading-normal">
                            Redesign New Online Shop
                          </h6>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
                      <div className="mt-2 avatar-group">
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-1.jpg"
                            className="w-full rounded-full"
                            alt="user6"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Ryan Tompson
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                        <a
                          className="relative z-20 inline-flex items-center justify-center w-6 h-6 -ml-4 text-xs text-white transition-all duration-200 border-2 border-white border-solid rounded-full ease-soft-in-out hover:z-30"
                          data-target="tooltip_trigger"
                          data-placement="bottom"
                        >
                          <img
                            src="/img/team-4.jpg"
                            className="w-full rounded-full"
                            alt="user7"
                          />
                        </a>
                        <div
                          data-target="tooltip"
                          className="hidden px-2 py-1 text-sm text-white bg-black rounded-lg"
                          role="tooltip"
                        >
                          Jessica Doe
                          <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 text-sm leading-normal text-center align-middle bg-transparent border-0 whitespace-nowrap">
                      <span className="text-xs font-semibold leading-tight">
                        {" "}
                        $2,000{" "}
                      </span>
                    </td>
                    <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
                      <div className="w-3/4 mx-auto">
                        <div>
                          <div>
                            <span className="text-xs font-semibold leading-tight">
                              40%
                            </span>
                          </div>
                        </div>
                        <div className="text-xs h-0.75 w-30 m-0 flex overflow-visible rounded-lg bg-gray-200">
                          <div
                            className="duration-600 ease-soft bg-gradient-to-tl from-blue-600 to-cyan-400 -mt-0.38 -ml-px flex h-1.5 w-2/5 flex-col justify-center overflow-hidden whitespace-nowrap rounded bg-fuchsia-500 text-center text-white transition-all"
                            role="progressbar"
                            aria-valuenow="40"
                            aria-valuemin="0"
                            aria-valuemax="40"
                          ></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full px-3 md:w-1/2 md:flex-none lg:w-1/3 lg:flex-none">
        <div className="border-black/12.5 shadow-soft-xl relative flex h-full min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
          <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid bg-white p-6 pb-0">
            <h6>Orders overview</h6>
            <p className="text-sm leading-normal">
              <i className="fa fa-arrow-up text-lime-500"></i>
              <span className="font-semibold">24%</span> this month
            </p>
          </div>
          <div className="flex-auto p-4">
            <div className="before:border-r-solid relative before:absolute before:top-0 before:left-4 before:h-full before:border-r-2 before:border-r-slate-100 before:content-[''] before:lg:-ml-px">
              <div className="relative mb-4 mt-0 after:clear-both after:table after:content-['']">
                <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                  <i className="relative z-10 leading-none text-transparent ni ni-bell-55 leading-pro bg-gradient-to-tl from-green-600 to-lime-400 bg-clip-text fill-transparent"></i>
                </span>
                <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                  <h6 className="mb-0 text-sm font-semibold leading-normal text-slate-700">
                    $2400, Design changes
                  </h6>
                  <p className="mt-1 mb-0 text-xs font-semibold leading-tight text-slate-400">
                    22 DEC 7:20 PM
                  </p>
                </div>
              </div>
              <div className="relative mb-4 after:clear-both after:table after:content-['']">
                <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                  <i className="relative z-10 leading-none text-transparent ni ni-html5 leading-pro bg-gradient-to-tl from-red-600 to-rose-400 bg-clip-text fill-transparent"></i>
                </span>
                <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                  <h6 className="mb-0 text-sm font-semibold leading-normal text-slate-700">
                    New order #1832412
                  </h6>
                  <p className="mt-1 mb-0 text-xs font-semibold leading-tight text-slate-400">
                    21 DEC 11 PM
                  </p>
                </div>
              </div>
              <div className="relative mb-4 after:clear-both after:table after:content-['']">
                <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                  <i className="relative z-10 leading-none text-transparent ni ni-cart leading-pro bg-gradient-to-tl from-blue-600 to-cyan-400 bg-clip-text fill-transparent"></i>
                </span>
                <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                  <h6 className="mb-0 text-sm font-semibold leading-normal text-slate-700">
                    Server payments for April
                  </h6>
                  <p className="mt-1 mb-0 text-xs font-semibold leading-tight text-slate-400">
                    21 DEC 9:34 PM
                  </p>
                </div>
              </div>
              <div className="relative mb-4 after:clear-both after:table after:content-['']">
                <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                  <i className="relative z-10 leading-none text-transparent ni ni-credit-card leading-pro bg-gradient-to-tl from-red-500 to-yellow-400 bg-clip-text fill-transparent"></i>
                </span>
                <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                  <h6 className="mb-0 text-sm font-semibold leading-normal text-slate-700">
                    New card added for order #4395133
                  </h6>
                  <p className="mt-1 mb-0 text-xs font-semibold leading-tight text-slate-400">
                    20 DEC 2:20 AM
                  </p>
                </div>
              </div>
              <div className="relative mb-4 after:clear-both after:table after:content-['']">
                <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                  <i className="relative z-10 leading-none text-transparent ni ni-key-25 leading-pro bg-gradient-to-tl from-purple-700 to-pink-500 bg-clip-text fill-transparent"></i>
                </span>
                <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                  <h6 className="mb-0 text-sm font-semibold leading-normal text-slate-700">
                    Unlock packages for development
                  </h6>
                  <p className="mt-1 mb-0 text-xs font-semibold leading-tight text-slate-400">
                    18 DEC 4:54 AM
                  </p>
                </div>
              </div>
              <div className="relative mb-0 after:clear-both after:table after:content-['']">
                <span className="w-6.5 h-6.5 text-base absolute left-4 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-white text-center font-semibold">
                  <i className="relative z-10 leading-none text-transparent ni ni-money-coins leading-pro bg-gradient-to-tl from-gray-900 to-slate-800 bg-clip-text fill-transparent"></i>
                </span>
                <div className="ml-11.252 pt-1.4 lg:max-w-120 relative -top-1.5 w-auto">
                  <h6 className="mb-0 text-sm font-semibold leading-normal text-slate-700">
                    New order #9583120
                  </h6>
                  <p className="mt-1 mb-0 text-xs font-semibold leading-tight text-slate-400">
                    17 DEC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Row4;
