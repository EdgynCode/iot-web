import { format } from "date-fns";

const formatDate = (dateTime) => {
  if (!dateTime) return "N/A"; // Handle null or undefined values
  try {
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
      return "Invalid Date"; // Handle invalid date strings
    }
    return format(date, "dd-MM-yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
};

export default formatDate;
