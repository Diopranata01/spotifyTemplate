import React from "react";
import Image from "next/image";

const BankAccountCard = ({ name, bankName, accountNumber, copyToClipboard }) => {

  return (
    <div className="flex flex-row items-center justify-between border border-white rounded-lg p-4 py-2 px-2 md:px-4 text-white w-full max-w-md gap-2 md:gap-4 bg-transparent">
      <div className="text-[15px] md:text-[20px] font-lora">{name}</div>

      <div className="flex items-center justify-center sm:justify-between gap-2 sm:gap-4 md:gap-6 w-auto sm:w-full md:w-auto">
        <div className="bg-[#3A3A30]/70 rounded-md px-4 py-2 text-base text-white leading-tight flex flex-col min-w-40">
          <div className="text-[14px] md:text-[20px] font-lora truncate">{bankName}</div>
          <div className="text-[14px] md:text-[20px] font-lora truncate">{accountNumber}</div>
        </div>

        <button
          onClick={copyToClipboard}
          className="flex-shrink-0 hover:text-gray-300 transition-colors"
          title="Copy account number"
        >
          <Image
            src="/assets/Copy.svg"
            className="invert"
            alt="Copy"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default BankAccountCard;
