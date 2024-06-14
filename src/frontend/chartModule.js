function drawChart(type, response) {
  const config = {
    type: type,
    data: response.data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Line Chart'
        }
      }
    },
  };

  const DATA_COUNT = response.count;
  const NUMBER_CFG = {count: DATA_COUNT};

  const labels = response.labels;
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Доход',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
      },
      {
        label: 'Расход',
        data: Utils.numbers(NUMBER_CFG),
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
      }
    ]
  };
}
export {drawChart}