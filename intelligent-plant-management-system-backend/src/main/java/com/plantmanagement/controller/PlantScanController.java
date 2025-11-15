package com.plantmanagement.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.net.http.*;
import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/plant")
@CrossOrigin(origins = "http://localhost:5173")
public class PlantScanController {

    @Value("${gemini.api.key}")
    private String apiKey;

    @PostMapping("/scan")
    public Map<String, String> scanPlant(@RequestParam("file") MultipartFile file) {

        try {
            // Convert image → Base64
            String base64Image = Base64.getEncoder().encodeToString(file.getBytes());

            String prompt = """
                    You are FloraBot, an expert plant identification AI.
                    Identify this plant and also provide:
                    - Plant name
                    - Sunlight needs
                    - Watering needs
                    - Difficulty level
                    - Common diseases
                    - Tips to grow it better
                    """;

            String json = """
            {
              "contents": [
                {
                  "parts": [
                    { "text": "%s" },
                    {
                      "inline_data": {
                        "mime_type": "image/jpeg",
                        "data": "%s"
                      }
                    }
                  ]
                }
              ]
            }
            """.formatted(prompt.replace("\"", "'"), base64Image);

            String url = "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent?key="
                    + apiKey;

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("IMAGE SCAN RAW RESPONSE:");
            System.out.println(response.body());

            return Map.of("answer", response.body());

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("answer", "AI image scan error.");
        }
    }
}
