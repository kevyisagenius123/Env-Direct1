package com.environmentdirect.model;

/**
 * Enum representing the approval status of an article.
 * Articles can be in one of three states:
 * - PENDING_APPROVAL: Article has been submitted but not yet reviewed
 * - APPROVED: Article has been reviewed and approved for publication
 * - REJECTED: Article has been reviewed and rejected
 */
public enum ApprovalStatus {
    PENDING_APPROVAL,
    APPROVED,
    REJECTED
}