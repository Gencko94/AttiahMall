import React from 'react';
import { gsap, Power4 } from 'gsap';
export default function Promos() {
  const animation = React.useRef(null);
  const [words] = React.useState([
    'Extra 10% Off your First Order',
    'Free Shipping in Kuwait',
    'Free Returns in Kuwait',
  ]);
  const [i, setI] = React.useState(0);
  let wordRef = React.useRef();

  React.useEffect(() => {
    animation.current = gsap.fromTo(
      wordRef,
      {
        opacity: 0,
        scaleY: 0,
        transformOrigin: 'center',
      },
      {
        opacity: 1,
        scaleY: 1,
        repeat: -1,
        duration: 2,
        repeatDelay: 1,
        ease: Power4.easeInOut,
        onRepeat: () => {
          if (i === words.length - 1) {
            setI(0);
          } else {
            setI(i + 1);
          }
        },
        // yoyo: true,
      }
    );
  }, [i, words.length]);

  // React.useEffect(() => {
  //   setInterval(() => {
  //     console.log('running');
  //     if (i === words.length - 1) {
  //       console.log('0');
  //       setI(0);
  //     } else {
  //       console.log('+1');
  //       setI(i + 1);
  //     }
  //   }, 6000);
  // }, [i, words.length]);

  return (
    <div>
      <h1
        ref={element => {
          wordRef = element;
        }}
        className="text-sm"
      >
        {words[i]}
      </h1>
    </div>
  );
}
