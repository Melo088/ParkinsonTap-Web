package org.example.parkinsontapweb.controller;
import org.example.parkinsontapweb.dto.DataGraphDTO;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("api/reading")
@CrossOrigin(origins = "*")
public class ReadingController {

    @GetMapping("/data")
    public List<DataGraphDTO> getSimulatedData() {
        List<DataGraphDTO> dataList = new ArrayList<>();
        Random rand = new Random();
        long baseTime = System.currentTimeMillis();

        for (int i = 0; i < 100; i++) {
            double accX = -2 + 4 * rand.nextDouble();  // valores entre -2g y 2g
            double accY = -2 + 4 * rand.nextDouble();

            long timestamp = baseTime + i * 20; // simulando 50 Hz (cada 20 ms)
            dataList.add(new DataGraphDTO(timestamp, accX, accY));
        }

        return dataList;
    }
}