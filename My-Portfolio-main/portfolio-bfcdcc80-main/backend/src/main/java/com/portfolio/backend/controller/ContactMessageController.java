package com.portfolio.backend.controller;

import com.portfolio.backend.model.ContactMessage;
import com.portfolio.backend.repository.ContactMessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactMessageController {

    private final ContactMessageRepository repository;

    public ContactMessageController(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> submit(@RequestBody ContactMessage message) {
        message.setRead(false);
        ContactMessage saved = repository.save(message);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ContactMessage>> getAll() {
        return ResponseEntity.ok(repository.findAllByOrderByCreatedAtDesc());
    }

    @PutMapping("/messages/{id}/read")
    public ResponseEntity<Void> markRead(@PathVariable Long id) {
        ContactMessage msg = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        msg.setRead(true);
        repository.save(msg);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
