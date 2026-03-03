package com.led.estimate.service;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.SheetsScopes;
import com.google.api.services.sheets.v4.model.ValueRange;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

@Service
public class GoogleSheetsService {
    
    @Value("${google.sheets.id}")
    private String spreadsheetId;
    
    private static final String APPLICATION_NAME = "LED Estimate System";
    private static final String CREDENTIALS_FILE_PATH = "src/main/resources/credentials.json";
    
    private Sheets getSheetsService() throws IOException, GeneralSecurityException {
        GoogleCredentials credentials = GoogleCredentials.fromStream(
            new FileInputStream(CREDENTIALS_FILE_PATH))
            .createScoped(Collections.singleton(SheetsScopes.SPREADSHEETS));
        
        return new Sheets.Builder(
            GoogleNetHttpTransport.newTrustedTransport(),
            GsonFactory.getDefaultInstance(),
            new HttpCredentialsAdapter(credentials))
            .setApplicationName(APPLICATION_NAME)
            .build();
    }
    
    public List<List<Object>> readSheet(String range) throws Exception {
        Sheets service = getSheetsService();
        ValueRange response = service.spreadsheets().values()
            .get(spreadsheetId, range)
            .execute();
        return response.getValues();
    }
    
    public void writeSheet(String range, List<List<Object>> values) throws Exception {
        Sheets service = getSheetsService();
        ValueRange body = new ValueRange().setValues(values);
        service.spreadsheets().values()
            .update(spreadsheetId, range, body)
            .setValueInputOption("RAW")
            .execute();
    }
    
    public void appendSheet(String range, List<List<Object>> values) throws Exception {
        Sheets service = getSheetsService();
        ValueRange body = new ValueRange().setValues(values);
        service.spreadsheets().values()
            .append(spreadsheetId, range, body)
            .setValueInputOption("RAW")
            .execute();
    }
}
