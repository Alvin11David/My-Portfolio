package com.portfolio.service;

import com.portfolio.entity.ContactMessage;
import com.portfolio.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ContactMessageService {
    private final ContactMessageRepository repository;

    public ContactMessageService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public List<ContactMessage> findAll() {
        return repository.findAllByOrderByCreatedAtDesc();
    }

    public ContactMessage create(ContactMessage message) {
        return repository.save(message);
    }

    public void markRead(Long id) {
        ContactMessage msg = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found: " + id));
        msg.setRead(true);
        repository.save(msg);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
