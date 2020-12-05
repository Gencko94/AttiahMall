import { Formik, useField } from 'formik';
import React from 'react';
import { useIntl } from 'react-intl';
import { MoonLoader } from 'react-spinners';
import * as Yup from 'yup';
import { BiChevronDown } from 'react-icons/bi';
import useClickAway from '../hooks/useClickAway';
export default function LocationForm({
  markerAddress,

  addMutation,
  marker,
}) {
  const { formatMessage } = useIntl();
  const [defaultLocationChecked, setDefaultLocationChecked] = React.useState(
    false
  );
  const [userTypedLocation, setUserTypedLocation] = React.useState('');
  const validationSchema = Yup.object({
    apartmentOrHouseNumber: Yup.string().required(
      formatMessage({ id: 'apartment-empty' })
    ),
    buildingOrTowerNumber: Yup.string().required(
      formatMessage({ id: 'building-empty' })
    ),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, formatMessage({ id: 'number-only' }))
      .required(formatMessage({ id: 'phone-empty' })),
  });
  return (
    <div>
      <div className="font-bold p-2">
        <h1>{formatMessage({ id: 'location-details' })}</h1>
      </div>
      <div className="p-2">
        <div className="mb-1">
          <h1>
            {formatMessage({
              id: 'maps-detailed-address-street_neighborhood_governate',
            })}
          </h1>
          <textarea
            rows="3"
            className=" mt-1 w-full rounded border  p-1  "
            type="textarea"
            value={markerAddress || userTypedLocation}
            readOnly={markerAddress}
            onChange={e => setUserTypedLocation(e.target.value)}
          />
        </div>
        <Formik
          initialValues={{
            apartmentOrHouseNumber: '',
            buildingOrTowerNumber: '',
            phoneNumber: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async values => {
            await addMutation({
              lat: marker?.lat,
              lng: marker?.lng,
              defaultLocation: defaultLocationChecked,
              addressDetails: {
                ...values,
                markerAddress,
                userTypedLocation,
              },
            });
          }}
        >
          {({ handleSubmit, values, isSubmitting }) => {
            return (
              <form onSubmit={handleSubmit}>
                <CustomTextInput
                  label={formatMessage({
                    id: 'maps-detailed-address-apartment',
                  })}
                  name="apartmentOrHouseNumber"
                  value={values.apartmentOrHouseNumber}
                  type="text"
                />
                <CustomTextInput
                  label={formatMessage({
                    id: 'maps-detailed-address-building',
                  })}
                  name="buildingOrTowerNumber"
                  value={values.buildingOrTowerNumber}
                  type="text"
                />
                <PhoneNumberCustomInput
                  label={formatMessage({ id: 'maps-detailed-address-phone' })}
                  name="phoneNumber"
                  value={values.phoneNumber}
                  type="text"
                />

                <div className=" ">
                  <div className="flex items-center mb-2">
                    <label>{formatMessage({ id: 'mark-as-default' })}</label>
                    <input
                      className=" mx-2"
                      type="checkbox"
                      checked={defaultLocationChecked}
                      onChange={() =>
                        setDefaultLocationChecked(!defaultLocationChecked)
                      }
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!markerAddress && !userTypedLocation}
                    className={`${
                      !markerAddress && !userTypedLocation
                        ? 'btn-disabled'
                        : isSubmitting
                        ? 'bg-gray-300 text-main-text'
                        : 'bg-main-color text-main-text'
                    }   p-2 rounded  w-full  flex items-center justify-center font-semibold`}
                  >
                    {isSubmitting ? (
                      <MoonLoader size={19} color="#b72b2b" />
                    ) : (
                      <h1>{formatMessage({ id: 'confirm-location' })}</h1>
                    )}
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

const CustomTextInput = ({ label, value, name, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <div className="w-full mb-2 relative">
      <label htmlFor={name} className={`text-sm font-semibold text-gray-700`}>
        {label}
      </label>
      <input
        {...field}
        {...props}
        onBlur={e => {
          field.onBlur(e);
        }}
        className=" w-full rounded-sm border   p-1"
      />
      {meta.touched && meta.error ? (
        <h1 className="text-xs text-main-color mt-1">{meta.error}</h1>
      ) : (
        <h1 className="text-xs text-main-color mt-1" style={{ height: '18px' }}>
          {' '}
        </h1>
      )}
    </div>
  );
};
const PhoneNumberCustomInput = ({ label, value, name, ...props }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef();
  useClickAway(menuRef, () => {
    if (menuRef.current) {
      setMenuOpen(false);
    }
  });
  const [field, meta] = useField(name);
  return (
    <div className="w-full mb-2 ">
      <label htmlFor={name} className={`text-sm font-semibold text-gray-700`}>
        {label}
      </label>
      <div className="flex rounded-sm border items-center relative  ">
        <div
          ref={menuRef}
          onClick={() => setMenuOpen(!menuOpen)}
          className="  cursor-pointer flex items-center p-1 border-r"
          style={{ width: '74px' }}
        >
          <span>+966</span>
          <BiChevronDown className="mx-1 w-5 h-5" />
          {menuOpen && (
            <div
              className="absolute top-100 left-0 w-full border z-1 bg-body-light"
              style={{ width: '74px' }}
            >
              <div className="hover:bg-main-color p-1 hover:text-main-text flex justify-start items-center">
                +966
              </div>
            </div>
          )}
        </div>
        <input
          {...field}
          {...props}
          onBlur={e => {
            field.onBlur(e);
          }}
          className=" w-full p-1"
        />
      </div>
      {meta.touched && meta.error ? (
        <h1 className="text-xs text-main-color mt-1">{meta.error}</h1>
      ) : (
        <h1 className="text-xs text-main-color mt-1" style={{ height: '18px' }}>
          {' '}
        </h1>
      )}
    </div>
  );
};
