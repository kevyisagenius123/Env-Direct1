package com.environmentdirect.controller;

import com.environmentdirect.dto.ServiceRequestDTO;
import com.environmentdirect.service.ServiceRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestService serviceRequestService;

    @PostMapping
    public ResponseEntity<Void> createServiceRequest(@Valid @RequestBody ServiceRequestDTO requestDTO) {
        serviceRequestService.createServiceRequest(requestDTO);
        return ResponseEntity.ok().build();
    }
} 