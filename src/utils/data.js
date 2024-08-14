import axios from "axios";
import { saveAs } from "file-saver";

export const fetchChartData = async (params) => {
  try {
    const response = await axios.get(
      "https://www.consumerfinance.gov/oah-api/rates/rate-checker",
      {
        params: {
          price: params.price,
          loan_amount: params.loanAmount,
          minfico: params.minfico,
          maxfico: params.maxfico,
          state: params.state,
          rate_structure: params.rateStructure,
          loan_term: params.loanTerm,
          loan_type: params.loanType,
          arm_type: params.armType,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

import { saveAs } from "file-saver";

export const downloadChart = () => {
  const canvas = document.querySelector("canvas");
  canvas.toBlob((blob) => {
    saveAs(blob, "chart.png");
  });
};
