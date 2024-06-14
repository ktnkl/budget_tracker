function formatDate(date) {
  date = new Date(date)
  let day = date.getDate()
  const monthes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  let monthNum = monthes[date.getMonth()]
  let year = date.getFullYear()

  return day + "." + monthNum + "." + year
}


export {cat, formatDate}