package com.plantmanagement.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "http://localhost:5173")
public class ChatController {

    @Value("${gemini.api.key}")
    private String apiKey;

    @PostMapping("/ask")
    public Map<String, String> ask(@RequestBody Map<String, String> body) {

        try {
            String question = body.get("question");

            String prompt = """
                    You are FloraBot, a friendly plant expert.
                    Answer clearly and give helpful plant suggestions.

                    User question: 
                    """ + question;

            String json = """
            {
              "contents": [
                {
                  "parts": [
                    { "text": "%s" }
                  ]
                }
              ]
            }
            """.formatted(prompt.replace("\"", "'"));

            // ⭐ Use an available model: gemini-2.0-flash
            String url =
                    "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key="
                            + apiKey;

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response =
                    client.send(request, HttpResponse.BodyHandlers.ofString());

            System.out.println("RAW GEMINI RESPONSE:");
            System.out.println(response.body());

            return Map.of("answer", response.body());

        } catch (Exception e) {
            e.printStackTrace();
            return Map.of("answer", "AI error occurred.");
        }
    }
}
