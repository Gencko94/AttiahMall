import React from 'react';
import { BiRadioCircle, BiRadioCircleMarked } from 'react-icons/bi';
import knet from '../../../assets/paymentLogos/knet.png';
import mastercard from '../../../assets/paymentLogos/mastercard.png';
import visa from '../../../assets/paymentLogos/visa.png';
export default function PersonalInformation({
  handleStepForward,
  handleStepBack,
}) {
  const [personalInfo, setPersonalInfo] = React.useState({
    fullName: '',
    phoneNumber: '',
  });
  const paymentMethodOptions = [
    { name: 'K-net', photo: knet },
    { name: 'Visa ', photo: visa },
    { name: 'Master Card', photo: mastercard },
  ];
  const [paymentMethod, setPaymentMethod] = React.useState('K-net');
  const handleInputChange = (e, type) => {
    setPersonalInfo({
      ...personalInfo,
      [type]: e.target.value,
    });
  };
  const handlePaymentChange = method => {
    setPaymentMethod(method);
  };
  return (
    <div className="h-full  ">
      <div className=" mb-2 border rounded-lg h-full  ">
        <div className="pt-2 px-2">
          <h1 className="font-semibold">Personal information</h1>
        </div>
        <hr className="my-2" />
        <div className="quick-checkout-personal-info__container p-2">
          <div className="flex flex-col justify-center font-semibold text-sm  ">
            <div className=" mb-4 relative  ">
              <h1>Full Name</h1>
              <input
                className=" mt-1 w-full rounded border   p-2"
                type="text"
                value={personalInfo.fullName}
                onChange={e => handleInputChange(e, 'fullName')}
              />
            </div>

            <div className="relative  mb-4 ">
              <h1>Phone Number</h1>
              <input
                className=" mt-1 w-full rounded border  p-2  "
                type="text"
                value={personalInfo.lastName}
                onChange={e => handleInputChange(e, 'phoneNumber')}
              />
            </div>
          </div>
          <div className="font-semibold self-start">
            <div className=" mb-4 relative  ">
              <h1 className="">Payment Method</h1>
              <div className="mt-1">
                <div className="flex flex-col ">
                  {paymentMethodOptions.map((option, i) => {
                    return (
                      <button
                        key={i}
                        onClick={() => handlePaymentChange(option.name)}
                        className={` ${
                          paymentMethod === option.name &&
                          'bg-btn-primary-light text-btn-secondary-light border-btn-primary-light'
                        } mb-3 flex border items-center justify-start rounded p-2 font-semibold`}
                      >
                        <img
                          className=" mr-3"
                          src={option.photo}
                          alt={option.name}
                        />
                        <div className="flex-1 text-left">{option.name}</div>
                        <div>
                          {paymentMethod === option.name ? (
                            <BiRadioCircleMarked className="w-6 h-6 text-btn-secondary-light" />
                          ) : (
                            <BiRadioCircle className="w-6 h-6 text-btn-primary-light" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-2" />

        <h1 className="text-sm px-2 ">
          Our checkout is safe and secure. Your personal and payment information
          is securely transmitted via 128-bit encryption. We do not store any
          payment card information on our systems/
        </h1>
        <div className="flex justify-end items-center p-2">
          <button
            className="px-3 py-1 bg-btn-primary-light text-btn-secondary-light rounded font-semibold mr-3"
            onClick={handleStepBack}
          >
            Back
          </button>
          <button
            className="px-3 py-1 bg-btn-primary-light text-btn-secondary-light rounded font-semibold"
            onClick={handleStepForward}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
