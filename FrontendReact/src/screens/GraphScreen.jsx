import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { fetchSimulatedData } from '../services/readingService'; 


// almacenar en datos primitivos esta muestra


const Graph = () => {
  const [timestamps, setTimestamps] = useState([]);
  const [accXData, setAccXData] = useState([]);
  const [accYData, setAccYData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSimulatedData();
      if (data.length > 0) {
        const baseTime = data[0].timestamp;
        setTimestamps(data.map(item => (item.timestamp - baseTime) / 1000)); 
        setAccXData(data.map(item => item.accX));
        setAccYData(data.map(item => item.accY));
      }
    };

    loadData();
  }, []);

  return (
    <Box sx={{ width: 800, height: 500 }}>
      <LineChart
        xAxis={[{ data: timestamps, label: 'Tiempo (s)' }]}
        yAxis={[{ label: 'Magnitud' }]}
        series={[
          {
            data: accXData,
            label: 'AccX',
            showMark: false,
          },
          {
            data: accYData,
            label: 'AccY',
            showMark: false,
          },
        ]}
        grid={{ horizontal: true, vertical: true }}
      />
    </Box>
  );
};

export default Graph;
