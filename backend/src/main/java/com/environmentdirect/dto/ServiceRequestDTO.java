package com.environmentdirect.dto;

import com.environmentdirect.model.ServiceRequest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public record ServiceRequestDTO(
    @NotEmpty String serviceName,
    @NotEmpty String userName,
    @Email @NotEmpty String userEmail,
    String userPhone,
    String message
) {
    public ServiceRequest toEntity() {
        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setServiceName(serviceName);
        serviceRequest.setUserName(userName);
        serviceRequest.setUserEmail(userEmail);
        serviceRequest.setUserPhone(userPhone);
        serviceRequest.setMessage(message);
        return serviceRequest;
    }
} 