package com.portfolio.controller;

import com.portfolio.entity.ContactMessage;
import com.portfolio.service.ContactMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactMessageService service;

    public ContactController(ContactMessageService service) {
        this.service = service;
    }

    @PostMapping
    public ContactMessage submit(@RequestBody ContactMessage message) {
        return service.create(message);
    }

    @GetMapping("/messages")
    public List<ContactMessage> getMessages() {
        return service.findAll();
    }

    @PutMapping("/messages/{id}/read")
    public ResponseEntity<Void> markRead(@PathVariable Long id) {
        service.markRead(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
