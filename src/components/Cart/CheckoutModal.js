import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { GrClose } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
export default function CheckoutModal({
  checkoutModalOpen,
  isLightTheme,
  modalRef,
  setCheckOutModalOpen,
}) {
  const { formatMessage, locale } = useIntl();
  React.useEffect(() => {
    if (checkoutModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => (document.body.style.overflow = 'unset');
  }, [checkoutModalOpen]);
  return (
    <>
      <CSSTransition
        in={checkoutModalOpen}
        timeout={400}
        classNames="modal"
        unmountOnExit
      >
        <div
          className="  z-30 fixed top-0 left-0 right-0 bottom-0 grid place-items-center "
          style={{ paddingRight: '-15px' }}
        >
          <div
            ref={modalRef}
            className={`rounded-lg  ${
              isLightTheme
                ? 'bg-body-light text-body-text-light'
                : 'bg-body-dark text-body-text-dark'
            } w-11/12 md:max-w-lg`}
          >
            <div className=" p-4 text-lg font-semibold flex items-center justify-between">
              <h1>{formatMessage({ id: 'checkout' })}</h1>
              <button onClick={() => setCheckOutModalOpen(false)}>
                <GrClose />
              </button>
            </div>
            <hr />
            <h1 className="px-4 pt-2 text-sm font-semibold">
              {formatMessage({ id: 'not-signed-in' })} ,{' '}
              {formatMessage({ id: 'you-can' })} :
            </h1>
            <div className="flex items-center  px-4 py-2 text-white">
              <div className="flex-1">
                <Link
                  to={`/${locale}/checkout/quickcheckout`}
                  className="p-2 text-xl block bg-green-600 rounded w-full text-center"
                >
                  {formatMessage({ id: 'fly-checkout' })}
                </Link>
              </div>
              <div className="flex-1 mx-2">
                <Link
                  to={`/${locale}/app/login`}
                  className="p-2 text-xl block text-center bg-blue-700 rounded w-full"
                >
                  {formatMessage({ id: 'login' })}
                </Link>
              </div>
            </div>
            <hr />
            <div className="p-4 text-xs">
              <p>{formatMessage({ id: 'checkout-modal-tos' })}</p>
            </div>
          </div>
        </div>
      </CSSTransition>
      <CSSTransition
        in={checkoutModalOpen}
        timeout={400}
        classNames="modal-bg"
        unmountOnExit
      >
        <div className=" opacity-50 z-20 absolute top-0 left-0 right-0 bottom-0 bg-gray-700" />
      </CSSTransition>
    </>
  );
}
