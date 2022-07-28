import React, { Fragment, useEffect } from "react";
import { makeStyles, Hidden } from "@material-ui/core";
import Navbar from "./Navbar";
import Cajon from "./Cajon";
import { useState } from "react";
import axios from "axios";
import { Route, Link, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";

const estilos = makeStyles((theme) => ({
  root: {},
  toolbar: theme.mixins.toolbar,
  content: {
    display: "fixed",
    fkexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Contenedor = (props) => {
  let urlClima =
    "https://api.openweathermap.org/data/2.5/weather?&appid=b90f47135e7464a35184110e23a055c5&lang=es&q=";
  let urlNoticias = "https://newsapi.org/v2/everything?q=";
  let urlNoticias2 = "&pageSize=1&apiKey=f5335fdc2616454a8e8a82b495a49a77";

  const ciudadUrl = useParams();

  const ciudad = useParams();
  const classes = estilos();
  const [union, setUnion] = useState({});
  const [abrir, setAbrir] = useState(false);
  const [location, setLocation] = useState("");
  const [climas, setClimas] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [data, setData] = useState([]);
  const [datos, setDatos] = useState([]);

  const inicialUrl = async () => {
    console.log(ciudadUrl);
    if (ciudadUrl.ciudad) {
      urlClima = urlClima + ciudadUrl.ciudad;
      urlNoticias = urlNoticias + ciudadUrl.ciudad + urlNoticias2;
      console.log(urlClima);
      console.log(urlNoticias);
      const clima = await fetch(urlClima);
      const noticias = await fetch(urlNoticias);
      const [climaResponse, noticiasResponse] = await Promise.all([
        clima,
        noticias,
      ]);
      const [climaJson, noticiasJson] = await Promise.all(
        [climaResponse, noticiasResponse].map((promise) => promise.json())
      );

      setDatos({ ...climaJson, ...noticiasJson.articles });
    } else {
      console.log("No se ingreso ciudad");
    }
  };

  useEffect(() => {
    inicialUrl();
  }, [ciudadUrl]);

  useEffect(() => {
    guardar();
  }, [union]);
  

  const historial = async () => {
    let guarda = "https://localhost:7112/api/Citys/";
    await axios(guarda)
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClima = async (loc) => {
    setLocation(loc);
    let ciudade = loc;
    urlClima = urlClima + ciudade;
    urlNoticias = urlNoticias + ciudade + urlNoticias2;
    try {
      const clima = await fetch(urlClima);

      const noticias = await fetch(urlNoticias);

      const [climaResponse, noticiasResponse] = await Promise.all([
        clima,
        noticias,
      ]);

      const [climaJson, noticiasJson] = await Promise.all(
        [climaResponse, noticiasResponse].map((promise) => promise.json())
      );
      setDatos({ ...climaJson, ...noticiasJson.articles });
      setClimas(climaJson);
      setNoticias(noticiasJson.articles);
      const unionOb = {
        climaJson,
        noticiasJson,
      };
      const unionString = JSON.stringify(unionOb);
      setUnion({ city: loc, info: unionString });
      console.log(clima);
    } catch (err) {
      return {
        city: [],
        info: [],
      };
    }
  };

  const guardar = async () => {
    let guarda = "https://localhost:7112/api/Citys/";

    if (union.city)
      await axios
        .post(guarda, union, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const accionAbrir = () => {
    setAbrir(!abrir);
  };

  return (
    <div className={classes.root}>
      <Navbar accionAbrir={accionAbrir} getClima={getClima} guardar={guardar} />
      <Hidden xlUp>
        <Cajon
          variant="temporary"
          open={abrir}
          onClose={accionAbrir}
          historial={historial}
          
        />
      </Hidden>
      <div className={classes.content}>
        <pre>{JSON.stringify(datos, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Contenedor;
