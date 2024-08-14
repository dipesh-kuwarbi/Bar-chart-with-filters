import {
  Container,
  Button,
  Typography,
  Slider,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import { downloadChart, fetchChartData } from "./utils/data";
import ChartComponent from "./Components/ChartComponent";

const App = () => {
  const [state, setState] = useState("AK"); // State filter
  const [price, setPrice] = useState(200000); // House Price filter
  const [creditScore, setCreditScore] = useState([640, 659]); // Credit Score Range filter
  const [loanType, setLoanType] = useState("conf"); // Loan Type filter
  const [loanTerm, setLoanTerm] = useState(30); // Loan Term filter
  const [rateStructure, setRateStructure] = useState("fixed"); // Rate Structure filter
  const [data, setData] = useState();

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      const response = await fetchChartData({
        price,
        loanAmount: price * 0.9,
        minfico: creditScore[0],
        maxfico: creditScore[1],
        state,
        rateStructure,
        loanTerm,
        loanType,
        armType: "5-1", // Assuming '5-1' as a fixed value for ARM type.
      });
      setData(response);
    };
    fetchDataAndUpdate();
  }, [state, price, creditScore, loanType, loanTerm, rateStructure]);

  return (
    <Container>
      <Typography gutterBottom>Credit Score Range</Typography>
      <Slider
        value={creditScore}
        onChange={(e, newValue) => setCreditScore(newValue)}
        valueLabelDisplay="auto"
        min={600}
        max={850}
      />
      <FormControl variant="outlined" sx={{ minWidth: 120 }}>
        <InputLabel>State</InputLabel>
        <Select
          value={state}
          onChange={(e) => setState(e.target.value)}
          label="State"
        >
          <MenuItem value="AK">Alaska</MenuItem>
          <MenuItem value="CA">California</MenuItem>
        </Select>
      </FormControl>

      {/* House Price Filter */}
      <TextField
        label="$ House Price"
        variant="outlined"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
      />

      {/* Credit Score Range Filter */}
      <Slider
        value={creditScore}
        onChange={(e, newValue) => setCreditScore(newValue)}
        valueLabelDisplay="auto"
        min={600}
        max={850}
      />

      {/* Loan Type, Term, and Rate Structure Radio Buttons */}
      <RadioGroup
        row
        value={loanType}
        onChange={(e) => setLoanType(e.target.value)}
      >
        <FormControlLabel
          value="conf"
          control={<Radio />}
          label="Conventional"
        />
        <FormControlLabel value="FHA" control={<Radio />} label="FHA/VA" />
        <FormControlLabel value="cash" control={<Radio />} label="Cash/Waive" />
      </RadioGroup>

      <RadioGroup
        row
        value={loanTerm}
        onChange={(e) => setLoanTerm(e.target.value)}
      >
        <FormControlLabel value={15} control={<Radio />} label="15 Years" />
        <FormControlLabel value={20} control={<Radio />} label="20 Years" />
        <FormControlLabel value={30} control={<Radio />} label="30 Years" />
      </RadioGroup>

      <RadioGroup
        row
        value={rateStructure}
        onChange={(e) => setRateStructure(e.target.value)}
      >
        <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
        <FormControlLabel
          value="adjustable"
          control={<Radio />}
          label="Adjustable"
        />
      </RadioGroup>

      {/* Chart */}
      {data && <ChartComponent data={data} />}

      {/* Download Button */}
      <Button onClick={downloadChart}>Download Chart</Button>
    </Container>
  );
};

export default App;
