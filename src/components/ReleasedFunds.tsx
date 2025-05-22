import React, { Fragment } from "react";
import TransactionLayout from "./custom-ui/TransactionLayout";

const ReleasedFunds = () => {
  return (
    <Fragment>
      <p className="text-[17px] font-normal">
        These funds have been released to your wallet upon delivey completion.
      </p>
      <TransactionLayout array={[1]}/>
    </Fragment>
  );
};

export default ReleasedFunds;
