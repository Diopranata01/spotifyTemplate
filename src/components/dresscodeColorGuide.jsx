import React from "react";

const DressCodeColorGuide = () => {
  return (
    <div className="flex gap-3 justify-between">
      <div className="w-full flex flex-col items-center gap-3">
        {/* Circle 1 */}
        <div className="w-[120px] h-[140px] rounded-[90px] rounded-s-none rounded-b-none bg-[#EBE3D2] flex items-center justify-center">
          <span className="text-[#414833] font-semibold"></span>
        </div>

        {/* Circle 2 */}
        <div className="w-[120px] h-[140px] rounded-[90px] rounded-s-none rounded-b-none bg-[#D0CDC6] flex items-center justify-center">
          <span className="text-[#414833] font-semibold"></span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        {/* Circle 3 */}
        <div className="w-[120px] h-[140px] rounded-[90px] rounded-s-none rounded-b-none bg-[#B9A696] flex items-center justify-center">
          <span className="text-[#414833] font-semibold"></span>
        </div>

        {/* Circle 4 */}
        <div className="w-[120px] h-[140px] rounded-[90px] rounded-s-none rounded-b-none bg-[#2F2621] flex items-center justify-center">
          <span className="text-[#EBE3D2] font-semibold"></span>
        </div>
      </div>
    </div>
  );
};

export default DressCodeColorGuide;
