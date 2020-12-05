import axios from 'axios';
import React from 'react';

export default function Test() {
  const [data, setData] = React.useState([]);
  const url = 'http://soufian.myhomeagadir.com/api';
  React.useEffect(() => {
    axios.get(`${url}/slideshow`).then(res => setData(res.data.data));
  }, []);

  return (
    <div>
      {data.map(i => {
        return <img src={i.image.link} alt="" />;
      })}
    </div>
  );
}
