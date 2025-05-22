import React, { Fragment } from 'react'
import TransactionLayout from './custom-ui/TransactionLayout';

const LockedFunds = () => {
  return (
    <Fragment>
      <p className="text-[17px] font-normal">You have two(2) funds locked.</p>
      <TransactionLayout array={[1,2,3]}/>
    </Fragment>
  );
}

export default LockedFunds