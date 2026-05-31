import { supabase } from "../utils/supabase";

export const fetchData = async () => {
  const { data, error } = await supabase.from("forensic_data").select("*");
  if (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  return data;
};

export const insertData = async () => {
  const { data, error } = await supabase
    .from("forensic_data")
    .insert([{ name: "New Case", description: "Suspicious Activity" }]);

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted:", data);
  }
};

export const updateData = async (id) => {
  const { data, error } = await supabase
    .from("forensic_data")
    .update({ description: "Updated Description" })
    .eq("id", id);

  if (error) {
    console.error("Error updating data:", error);
  } else {
    console.log("Data updated:", data);
  }
};

export const deleteData = async (id) => {
  const { data, error } = await supabase
    .from("forensic_data")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting data:", error);
  } else {
    console.log("Data deleted:", data);
  }
};

export const subscribeToChanges = (setData) => {
  const subscription = supabase
    .channel("forensic_data_changes")
    .on("postgres_changes", { event: "*", schema: "public", table: "forensic_data" }, (payload) => {
      console.log("Change received:", payload);
      setData((prevData) =>
        prevData.map((item) => (item.id === payload.new.id ? payload.new : item))
      );
    })
    .subscribe();

  return () => {
    supabase.removeChannel(subscription);
  };
};
