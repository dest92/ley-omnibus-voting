// src/components/ContadorVotos.jsx

import { useState, useEffect } from "react";
import { supabase } from "../database/supabaseClient";
import { Snippet } from "@nextui-org/react";
import CountUp from "./CountUp";

export default function VotesContraCounter() {
  const [contador, setContador] = useState(0);
  const [prevContador, setPrevContador] = useState(0);

  useEffect(() => {
    // Crear un canal de suscripción
    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public" },
        (payload: any) => {
          // Actualizar el estado del contador aquí con los datos de 'payload'
          // console.log("Change received!", payload);
          setPrevContador(contador);
          setContador(payload.new.contador); // Ajustar según la estructura de tu payload
        }
      )
      .subscribe();

    // Cargar el valor inicial del contador
    const cargarContadorInicial = async () => {
      const { data, error } = await supabase
        .from("votos")
        .select("contador")
        .eq("id", 2)
        .single();

      console.log(error);
      if (data) {
        setContador(data.contador);
      }
    };

    cargarContadorInicial();

    // Limpieza al desmontar el componente
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="pt-5">
      <h1>Total de votos en contra:</h1>
      <Snippet color="danger" className="mt-5" symbol="" hideCopyButton>
        <CountUp
          start={prevContador}
          end={contador}
          duration={1000}
          text="🗳️: "
        />
      </Snippet>
    </div>
  );
}
