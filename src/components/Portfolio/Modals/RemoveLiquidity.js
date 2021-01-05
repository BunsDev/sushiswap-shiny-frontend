import React from "react";
import ClassicRemove from "../../../services/exchange/pages/RemoveLiquidity/secondaryWithoutHistory";

const RemoveLiquidity = ({ onDismiss, data }) => {
  return (
    <>
      <span className="hidden md:inline-block md:align-middle md:h-screen" />
      <div
        className="px-6 py-4 w-full md:align-middle md:max-w-sm bg-white inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="block absolute top-0 right-0 pt-4 pr-4">
          <button
            onClick={() => {
              onDismiss();
            }}
            type="button"
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="items-start">
          <div className="text-left">
            <h3 className="mb-4 text-lg leading-6 text-gray-900" id="modal-headline">
              Remove Liquidity
            </h3>
            <div>
              <ClassicRemove currencyIdA={data.token0} currencyIdB={data.token1} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemoveLiquidity;