package com.cpe.springboot.gen_card_service.service;

import com.cpe.springboot.gen_card_service.dto.CardGenerationRequestDto;
import com.cpe.springboot.gen_card_service.model.CardRequestEntity;
import com.cpe.springboot.gen_card_service.model.RequestStatus;
import com.cpe.springboot.gen_card_service.repository.CardRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CardGenerationService {

    private final CardRequestRepository repository;
    private final RestTemplate rest = new RestTemplate();

    public CardGenerationService(CardRequestRepository repository) {
        this.repository = repository;
    }

    public void handleNewRequest(CardGenerationRequestDto dto) {
        System.out.println("📩 Nouvelle demande reçue : id=" + dto.getId() + ", user=" + dto.getUserId());

        //Enregistre juste l'état initial
        CardRequestEntity entity = new CardRequestEntity();
        entity.setRequestId(dto.getId().toString());
        entity.setUserId(dto.getUserId());
        entity.setStatus(RequestStatus.PENDING);
        repository.save(entity);

        //Envoie directement les prompts aux générateurs
        sendToImageService(dto.getId(), dto.getImagePrompt());
        System.out.println("génération du texte ");
        sendToTextService(dto.getId(), dto.getDescription());
    }

    private void sendToImageService(Long id, String prompt) {
        try {
            System.out.println("sendToImageService");
            String url = "http://localhost:8081/api/image/generate";
            var body = new ImagePrompt(id, prompt);
            rest.postForEntity(url, body, Void.class);
            System.out.println("🚀 Envoi prompt image à " + url);}
        catch (Exception e) {
            System.err.println("❌ Erreur image-service : " + e.getMessage());
        }
    }

    private void sendToTextService(Long id, String description) {
        try{
            String url = "http://localhost:8086/generatetext";
            var body = new TextPrompt(id, description);
            rest.postForEntity(url, body, Void.class);
            System.out.println("🚀 Envoi prompt texte à " + url);}
        catch (Exception e) {
            System.err.println("❌ Erreur text-service : " + e.getMessage());
        }
    }


    // Petits DTO internes pour les POST
    static class ImagePrompt {
        public Long id;
        public String prompt;
        public ImagePrompt(Long id, String prompt) {
            this.id = id; this.prompt = prompt;
        }
    }

    static class TextPrompt {
        public Long id;
        public String description;
        public TextPrompt(Long id, String description) {
            this.id = id; this.description = description;
        }
    }
}
