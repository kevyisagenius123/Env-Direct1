package com.environmentdirect.service;

import com.environmentdirect.dto.ServiceRequestDTO;
import com.environmentdirect.model.ServiceRequest;
import com.environmentdirect.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServiceRequestService {

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;

    public void createServiceRequest(ServiceRequestDTO requestDTO) {
        ServiceRequest serviceRequest = requestDTO.toEntity();
        serviceRequestRepository.save(serviceRequest);
        // Here you could also add logic to send an email notification, etc.
    }
} 