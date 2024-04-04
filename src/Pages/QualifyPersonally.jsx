import { useParams, useNavigate } from "react-router-dom";
import {
  getStatusQueryRequest,
  getStatusRespuestasRequest,
  getPartParrafosRequest,
  getSepNivRequest,
  getYouPreguntasRequest,
  getProductoFinalRequest,
  getLectCompRequest,
} from "../api/status";
import { useEffect, useState } from "react";
import { QualyNavLayout } from "../layouts/QualyNavLayout";
import { ReadingStatus } from "./ReadingStatus";

export const QualifyPersonally = () => {
  const { idu, idl } = useParams();
  // const navigate = useNavigate();
  // const params = useParams();
  // const [estado, setEstado] = useState({});
  // const [loading, setLoading] = useState(true);
  // const getStatusQuery = async () => {
  //   const { data } = await getStatusQueryRequest(idl, idu);
  //   setEstado(data);
  //   setLoading(false);
  //   // const { data: dataR } = await getStatusRespuestasRequest(idl, idu);
  //   // const { data: dataPP } = await getPartParrafosRequest(idl, idu);
  //   // const { data: dataSN } = await getSepNivRequest(idl, idu);
  //   // const { data: dataYP } = await getYouPreguntasRequest(idl, idu);
  //   // const { data: dataPF } = await getProductoFinalRequest(idl, idu);
  //   // const { data: dataLC } = await getLectCompRequest(idl, idu);

  //   // console.log("data");
  //   // console.log(data);
  //   // console.log("dataR");
  //   // console.log(dataR);
  //   // console.log("dataPP");
  //   // console.log(dataPP);
  //   // console.log("dataSN");
  //   // console.log(dataSN);
  //   // console.log("dataYP");
  //   // console.log(dataYP);
  //   // console.log("dataPF");
  //   // console.log(dataPF);
  //   // console.log("dataLC");
  //   // console.log(dataLC);
  // };
  // useEffect(() => {
  //   getStatusQuery();
  // }, []);

  return (
    <div>
      <QualyNavLayout idl={idl} idu={idu} />
      <ReadingStatus idl={idl} idu={idu} />
      {/* <p>{idu}</p>
      <br />
      <p>{idl}</p> */}
    </div>
  );
};
