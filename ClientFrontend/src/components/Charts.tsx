import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line, Pie, Radar, Scatter } from "react-chartjs-2";
import "chart.js/auto";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

const months = ["January", "February", "March", "April", "May", "June", "July"];

interface BarChartProps {
  horizontal?: boolean;
  data_1: number[];
  data_2: number[];
  data_3: number[];

  title_1: string;
  title_2: string;
  title_3: string;
  bgColor_1: string;
  bgColor_2: string;
  bgColor_3: string;
  labels?: string[];
}

export const BarChart = ({
  data_1 = [],
  data_2 = [],
  data_3 = [],
  title_1,
  title_2,
  title_3,
  bgColor_1,
  bgColor_2,
  bgColor_3,
  horizontal = false,
  labels = months,
}: BarChartProps) => {
  const options: ChartOptions<"bar"> = {
    // responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Intensity,  Relevance and Likelihood of Insights",
        align: "center",
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: title_1,
        data: data_1,
        backgroundColor: bgColor_1,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
      {
        label: title_2,
        data: data_2,
        backgroundColor: bgColor_2,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
      {
        label: title_3,
        data: data_3,
        backgroundColor: bgColor_3,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  cutout?: number | string;
  legends?: boolean;
  offset?: number[];
}

export const DoughnutChart = ({
  labels,
  data,
  backgroundColor,
  cutout,
  legends = true,
  offset,
}: DoughnutChartProps) => {
  const doughnutData: ChartData<"doughnut", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
        offset,
      },
    ],
  };

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Regionwise Insights Distribution",
      },
      legend: {
        display: legends,
        position: "bottom",
        labels: {
          padding: 40,
        },
      },
    },
    cutout,
  };

  return <Doughnut data={doughnutData} options={doughnutOptions} />;
};

interface PieChartProps {
  labels: string[];
  data: number[];
  backgroundColor: string[];
  offset?: number[];
}
export const PieChart = ({
  labels,
  data,
  backgroundColor,
  offset,
}: PieChartProps) => {
  const pieChartData: ChartData<"pie", number[], string> = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 1,
        offset,
      },
    ],
  };

  const pieChartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Countrywise Insights Distribution",
      },
    },
  };

  return <Pie data={pieChartData} options={pieChartOptions} />;
};

interface LineChartProps {
  data: number[];
  label: string;
  backgroundColor: string;
  borderColor: string;
  labels?: string[];
}

export const LineChart = ({
  data,
  label,
  backgroundColor,
  borderColor,
  labels = months,
}: LineChartProps) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const lineChartData: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        fill: true,
        label,
        data,
        backgroundColor,
        borderColor,
      },
    ],
  };

  return <Line options={options} data={lineChartData} />;
};

interface ScatterChartProps {
  data: number[][];
  labels: string[];
  backgroundColor: string[];
}
export const ScatterChart = ({
  data,
  labels,
  backgroundColor,
}: ScatterChartProps) => {
  let scatterDataArray = [];
  for (let i = 0; i < labels?.length; i++) {
    for (let j = 0; j < data[i]?.length; j++) {
      scatterDataArray.push({ x: labels[i], y: data[i][j] });
    }
  }
  const ScatterData: ChartData<"scatter", { x: string; y: number }[], string> =
    {
      datasets: [
        {
          label: "Intensity",
          data: scatterDataArray,
          backgroundColor,
        },
      ],
    };
  const scatterOptions: ChartOptions<"scatter"> = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        type: "category",
        labels: labels,
      },
      y: {},
    },
    plugins: {
      title: {
        display: true,
        text: "Intensities of Topics",
      },
    },
  };

  return (
    <Scatter
      //   width={"80%"}
      //   height={"90%"}
      data={ScatterData}
      options={scatterOptions}
    />
  );
};

interface RadarChartProps {
  data: number[];
  labels: string[];
  backgroundColor: string;
  borderColor: string;
  fill?: boolean;
}

export const RadarChart = ({
  data,
  labels,
  backgroundColor,
  borderColor,
  fill,
}: RadarChartProps) => {
  const radarData: ChartData<"radar", number[], string> = {
    labels,
    datasets: [{ data, backgroundColor, borderColor, fill }],
  };

  const radarOptions: ChartOptions<"radar"> = {
    elements: {
      line: {
        borderWidth: 3,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Startyear wise Insights Distribution",
      },
    },
  };
  return <Radar data={radarData} options={radarOptions} />;
};
