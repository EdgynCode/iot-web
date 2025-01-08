import { format } from "date-fns";
const formatDate = (dateTime) => {
  const date = new Date(dateTime);
  return format(date, "dd-MM-yyyy");
};

export default formatDate;
