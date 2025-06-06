import React from "react";
import Image from "next/image";

const BankAccountCard = ({ name, bankName, accountNumber, copyToClipboard }) => {

  return (
    <div className="flex flex-row items-center justify-between border border-white rounded-lg p-4 py-2 px-2 md:px-4 text-white w-full max-w-md gap-2 md:gap-4 xl:gap-2 2xl:gap-4 bg-transparent">
      <div className="text-[14px] md:text-[20px] xl:text-[15px] 2xl:text-[20px] font-lora">{name}</div>

      <div className="flex items-center justify-center sm:justify-between gap-2 sm:gap-4 md:gap-6 xl:gap-3 2xl:gap-6 w-auto sm:w-full md:w-auto">
        <div className="bg-[#3A3A30]/70 rounded-md px-4 xl:px-2 2xl:px-4 py-2 text-base text-white leading-tight flex flex-col min-w-40 xl:min-w-24 2xl:min-w-40">
          <div className="text-[14px] md:text-[20px] xl:text-[15px] 2xl:text-[20px] font-lora truncate">{bankName}</div>
          <div className="text-[14px] md:text-[20px] xl:text-[15px] 2xl:text-[20px] font-lora truncate">{accountNumber}</div>
        </div>

        <button
          onClick={() => copyToClipboard(accountNumber)}
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
