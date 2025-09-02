import React from "react";
import { BASE_URL_MY } from "@/config/Api";

const Header = ({ voucherNo, pfor }) => {
  return (
    <div className="grid grid-cols-12 bg-[#012d60] text-white py-3 border-gray-400">
      <div className="col-span-2 flex items-center justify-center px-3 py-1">
        <img
          src={`${BASE_URL_MY}/images/logo.png`}
          // className="w-[99%]"
          width="99%"
          height="99%"
        />
      </div>
      <div className="col-span-8 px-3 py-1" style={{ textAlign: "left" }}>
        <h2 className="text-2xl font-bold">
          <span>SBS DIGITAL INFOTECH</span>
        </h2>
        {/* <h5 className="text-xl font-bold">
          <span>(An ISO 9001:2015 Certified Company)</span>
        </h5> */}
        <h6 className="text-md font-semibold">
          <span>
            B- 23 Apollo Market Raj Bagh Metro Station,
            <br />
            Sahibabad, Ghaziabad, Uttar Pradesh, India (Pincode: 201005)
            <br />
            EMAIL- info@sbsdigitalinfotech.com
            <br />
            GST NO : 05AAJCG7257M1Z3, PAN NO: AAJCG7257M
          </span>
        </h6>
      </div>
      <div className="col-span-2 px-3 py-1" style={{ textAlign: "center" }}>
        <h4 className="text-xl font-bold">
          <br />
          <span className="font-semibold">{pfor}</span>
        </h4>
        <br />
        <h6 className="text-lg font-bold">{voucherNo}</h6>
      </div>
    </div>
  );
};

export default Header;
