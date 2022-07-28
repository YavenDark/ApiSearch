import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Historial = () => {

    const [data, setData] = useState([])
    useEffect(() => {
        
        let guarda = "https://localhost:7112/api/Citys/";
        axios(guarda)
          .then((res) => {
            setData(res.data);
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
    }, [])
  

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Historial;
