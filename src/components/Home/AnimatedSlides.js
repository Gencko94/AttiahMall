import React from 'react';

export default function AnimatedSlides({ data }) {
  return (
    <div>
      <div className="animated__slides-title">
        <h1 className="text-center font-bold text-2xl uppercase">
          Grab our Mega Offers
        </h1>
      </div>

      <div className="animated__slides-container">
        {data.map((item, i) => {
          return (
            <div className="animated__slides-card" key={i}>
              <div className="imgBx">
                <img src={item.photo} alt={item} />
              </div>
              <div className="title">
                <h1 className="font-semibold text-lg">{item.title}</h1>
              </div>
              <div className="content text-sm">
                <h1>Explore the things</h1>

                <p>
                  Lorem Ipsum sit amet dolor, adiplscing elit sed do eiusmod
                </p>
                <button className="p-1">See Details</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
