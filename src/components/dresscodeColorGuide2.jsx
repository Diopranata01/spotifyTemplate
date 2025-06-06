import React from "react";

const DressCodeColorGuide2 = () => {
  return (
    <div className="flex gap-6 justify-center flex-wrap mt-1">
      <div className="flex justify-center items-center gap-7">
        {/* Circle 1 */}
        <div className="w-10 h-10 rounded-full bg-[#87CEEB] flex items-center justify-center">
          <span className="text-[#414833] font-semibold"></span>
        </div>

        {/* Circle 2 */}
        <div className="w-10 h-10 rounded-full bg-[#F5DEB3] flex items-center justify-center">
          <span className="text-[#414833] font-semibold"></span>
        </div>

        {/* Circle 2 */}
        <div className="w-10 h-10 rounded-full bg-[#FFF] flex items-center justify-center">
          <span className="text-[#414833] font-semibold"></span>
        </div>
      </div>
    </div>
  );
};

export default DressCodeColorGuide2;
