import React from 'react';
import visa from '../../assets/paymentLogos/visa.png';
import mastercard from '../../assets/paymentLogos/mastercard.png';
import knet from '../../assets/paymentLogos/knet.png';
import sadad from '../../assets/paymentLogos/sadad.png';
import { useIntl } from 'react-intl';
export default function AcceptedPayments({ deliveryCountry }) {
  const { formatMessage } = useIntl();
  return (
    <div className="mb-2">
      <h1 className="mb-2 text-center font-semibold">
        {formatMessage({ id: 'accepted-payments' })}
      </h1>
      <div className="flex items-center justify-evenly mb-2">
        <img src={knet} alt="knet" />
        <img src={visa} alt="visa" />
        <img src={mastercard} alt="mastercard" />
        <img src={sadad} alt="sadad" />
      </div>
    </div>
  );
}
