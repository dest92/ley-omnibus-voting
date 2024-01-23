import { supabase } from "./supabaseClient";

export default async function updateColumn() {
  const { data, error } = await supabase
    .from("votos")
    .select("contador")
    .eq("id", 1)
    .single();

  if (error) {
    console.log("Error al actualizar el contador:", error);
    return;
  }
  //   console.log(data);

  const { status } = await supabase
    .from("votos")
    .update({ contador: data?.contador + 1 })
    .eq("id", 1);
  if (error !== null) {
    console.error("Error al actualizar el contador:", error);
  } else {
    console.log("Contador actualizado");
    console.log(status);
    localStorage.setItem("hasVoted", "true");
  }
}

export async function updateContraColumn() {
  const { data, error } = await supabase
    .from("votos")
    .select("contador")
    .eq("id", 2)
    .single();

  if (error) {
    console.log("Error al actualizar el contador:", error);
    return;
  }
  //   console.log(data);

  const { status } = await supabase
    .from("votos")
    .update({ contador: data?.contador + 1 })
    .eq("id", 2);
  if (error !== null) {
    console.error("Error al actualizar el contador:", error);
  } else {
    console.log("Contador actualizado");
    console.log(status);
    localStorage.setItem("hasVoted", "true");
  }
}
