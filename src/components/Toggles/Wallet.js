import React from "react";
import { useWallet } from "use-wallet";
import { divide } from "numeral";

const Toggle = ({ showWallets }) => {
  const { account } = useWallet();
  return (
    <>
      <div className="sushi-px-4 sushi-mt-2 sushi-flex sushi-items-center">
        {!account ? (
          <>
            {/* On: "bg-indigo-600", Off: "bg-gray-200" */}
            <span
              onClick={() => {
                showWallets();
              }}
              role="checkbox"
              tabIndex={0}
              aria-checked="false"
              className="sushi-bg-gray-200 sushi-relative sushi-inline-flex sushi-flex-shrink-0 sushi-h-6 sushi-w-11 sushi-border-2 sushi-border-transparent sushi-rounded-full sushi-cursor-pointer sushi-transition-colors sushi-ease-in-out sushi-duration-200 focus:sushi-outline-none focus:sushi-shadow-outline"
            >
              {/* On: "translate-x-5", Off: "translate-x-0" */}
              <span
                aria-hidden="true"
                className="sushi-translate-x-0 sushi-relative sushi-inline-block sushi-h-5 sushi-w-5 sushi-rounded-full sushi-bg-white sushi-shadow sushi-transform sushi-transition sushi-ease-in-out sushi-duration-200"
              >
                {/* On: "opacity-0 ease-out duration-100", Off: "opacity-100 ease-in duration-200" */}
                <span className="sushi-opacity-100 sushi-ease-in sushi-duration-200 sushi-absolute sushi-inset-0 sushi-h-full sushi-w-full sushi-flex sushi-items-center sushi-justify-center sushi-transition-opacity">
                  <svg
                    className="sushi-h-3 sushi-w-3 sushi-text-gray-400"
                    fill="none"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {/* On: "opacity-100 ease-in duration-200", Off: "opacity-0 ease-out duration-100" */}
                <span className="sushi-opacity-0 sushi-ease-out sushi-duration-100 sushi-absolute sushi-inset-0 sushi-h-full sushi-w-full sushi-flex sushi-items-center sushi-justify-center sushi-transition-opacity">
                  <svg
                    className="sushi-h-3 sushi-w-3 sushi-text-indigo-600"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                  </svg>
                </span>
              </span>
            </span>
            <span className="sushi-ml-3">
              Enable wallet to view summary statistics
            </span>
          </>
        ) : (
          <>
            {/* On: "bg-indigo-600", Off: "bg-gray-200" */}
            <span
              role="checkbox"
              tabIndex={0}
              aria-checked="false"
              className="sushi-bg-green-400 sushi-relative sushi-inline-flex sushi-flex-shrink-0 sushi-h-6 sushi-w-11 sushi-border-2 sushi-border-transparent sushi-rounded-full sushi-cursor-pointer sushi-transition-colors sushi-ease-in-out sushi-duration-200 focus:sushi-outline-none focus:sushi-shadow-outline"
            >
              {/* On: "translate-x-5", Off: "translate-x-0" */}
              <span
                aria-hidden="true"
                className="sushi-translate-x-5 sushi-relative sushi-inline-block sushi-h-5 sushi-w-5 sushi-rounded-full sushi-bg-white sushi-shadow sushi-transform sushi-transition sushi-ease-in-out sushi-duration-200"
              >
                {/* On: "opacity-0 ease-out duration-100", Off: "opacity-100 ease-in duration-200" */}
                <span className="sushi-opacity-0 sushi-ease-out sushi-duration-100 sushi-absolute sushi-inset-0 sushi-h-full sushi-w-full sushi-flex sushi-items-center sushi-justify-center sushi-transition-opacity">
                  <svg
                    className="sushi-h-3 sushi-w-3 sushi-text-gray-400"
                    fill="none"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {/* On: "opacity-100 ease-in duration-200", Off: "opacity-0 ease-out duration-100" */}
                <span className="sushi-opacity-100 sushi-ease-in sushi-duration-200 sushi-absolute sushi-inset-0 sushi-h-full sushi-w-full sushi-flex sushi-items-center sushi-justify-center sushi-transition-opacity">
                  <svg
                    className="sushi-h-3 sushi-w-3 sushi-text-green-400"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                  </svg>
                </span>
              </span>
            </span>
            <span className="sushi-ml-3 sushi-w-full">
              <div className="sushi-flex sushi-items-start sushi-justify-between sushi-space-x-3">
                <div className="sushi-mr-4">Swipe the table to see your stats</div>
                <div className="sushi-flex sushi-items-center">
                  <svg
                    class="sushi-animate-bounce-x sushi-w-6 sushi-h-6 sushi-text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>

              {/* <div className="sushi-flex sushi-text-sm sushi-leading-5">
                <span className="sushi-mr-4">Swipe the table to see your stats</span>
                <svg
                  class="sushi-animate-bounce-x sushi-w-6 sushi-h-6 sushi-text-gray-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div> */}
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default Toggle;
