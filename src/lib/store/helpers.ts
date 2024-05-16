import moment from "moment";

export const aid_year_tabs: { [key:string]: any } = {
  "last_year": `${moment().subtract(1, 'year').format("YYYY")}-${moment().format("YYYY")}`,
  "current_year": `${moment().format("YYYY")}-${moment().add(1, "year").format("YYYY")}`,
  "next_year": `${moment().add(1, 'year').format("YYYY")}-${moment().add(2, 'year').format("YYYY")}`
}