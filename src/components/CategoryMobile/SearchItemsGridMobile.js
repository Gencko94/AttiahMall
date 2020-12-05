import React from 'react';
// import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import CategoryProductItem from '../Category/CategoryProductItem';
import CategoryChildrenMobile from '../CategoryMobile/CategoryChildrenMobile';
import { useIntl } from 'react-intl';
export default function SearchItemsGridMobile({
  // queryData,
  // filteredData,
  // filtersApplied,
  productsLoading,
  products,
  categoryInfoLoading,
  categoryInfo,
}) {
  const { locale } = useIntl();
  if (productsLoading || categoryInfoLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader
          type="ThreeDots"
          color="#b72b2b"
          height={40}
          width={40}
          visible={true}
        />
      </div>
    );
  }
  return (
    <div>
      <div
        className="py-16 px-2 flex justify-center items-center"
        style={{
          backgroundImage: `url(${process.env.REACT_APP_IMAGES_URL}/original/${categoryInfo.image.link})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <h1 className="text-2xl text-main-text font-bold">
          {categoryInfo.translation[locale].name}
        </h1>
      </div>
      {categoryInfo.children.length !== 0 && (
        <CategoryChildrenMobile categoryInfo={categoryInfo} />
      )}
      <hr />
      {products.length !== 0 && (
        <div className="search-page-items-mobile__grid px-1 my-1">
          {products.map(item => {
            return <CategoryProductItem key={item.id} item={item} />;
          })}

          {/* {!filtersApplied &&
        queryData.map((item, i) => {
          return (
            <div key={i} className="">
              <div className=" bg-white border overflow-hidden flex flex-col relative  rounded-lg shadow-lg ">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.photos.small}
                    alt="something"
                    className="w-full h-auto  "
                  />
                </Link>
                <hr />

                <div className=" relative flex flex-col pt-2 p-3 bg-white text-black">
                  <h1 className="text-clamp-2 text-sm font-semibold">
                    <Link
                      title={item.name}
                      className="hover:underline"
                      to={`/products/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  </h1>

                  <div className="flex items-center">
                    <p className=" mr-3  text-xs font-semibold text-red-700 whitespace-no-wrap">
                      {item.price} <span className="text-xs ">KD</span>
                    </p>
                    {item.sale && (
                      <p className="text-xs  line-through text-gray-500  font-bold whitespace-no-wrap">
                        {' '}
                        {item.priceBefore}{' '}
                        <span className="font-normal">KD</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      {filtersApplied &&
        filteredData.map((item, i) => {
          return (
            <div key={i} className="">
              <div className=" bg-white border overflow-hidden flex flex-col relative  rounded-lg shadow-lg ">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.photos.small}
                    alt="something"
                    className="w-full h-auto  "
                  />
                </Link>
                <hr />

                <div className=" relative flex flex-col pt-2 p-3 bg-white text-black">
                  <h1 className="text-clamp-2 text-sm font-semibold">
                    <Link
                      title={item.name}
                      className="hover:underline"
                      to={`/products/${item.id}`}
                    >
                      {item.name}
                    </Link>
                  </h1>

                  <div className="flex items-center">
                    <p className=" mr-3  text-xs font-semibold text-red-700 whitespace-no-wrap">
                      {item.price} <span className="text-xs ">KD</span>
                    </p>
                    {item.sale && (
                      <p className="text-xs  line-through text-gray-500  font-bold whitespace-no-wrap">
                        {' '}
                        {item.priceBefore}{' '}
                        <span className="font-normal">KD</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })} */}
        </div>
      )}
    </div>
  );
}
