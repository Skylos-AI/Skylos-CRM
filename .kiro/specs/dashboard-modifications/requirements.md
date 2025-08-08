# Requirements Document

## Introduction

This document outlines the requirements for modifying the CRM dashboard to improve user experience by removing unused features and adding essential Google integrations. The modifications will streamline the navigation by removing the Media Library and Campaigns tabs while enhancing the Channels section with Google Meet and Google Sheets integrations to support modern business workflows.

## Requirements

### Requirement 1: Remove Media Library Tab

**User Story:** As a CRM administrator, I want to remove the Media Library tab from the navigation, so that users focus on core CRM functionality without unnecessary features.

#### Acceptance Criteria

1. WHEN the user views the sidebar navigation THEN the system SHALL NOT display the "Media Library" tab
2. WHEN the user attempts to access /media route THEN the system SHALL redirect to the dashboard or show a 404 page
3. WHEN the navigation is rendered THEN the system SHALL maintain proper spacing and visual hierarchy without the Media Library item
4. WHEN the user views the collapsed sidebar THEN the Media Library icon SHALL NOT be visible
5. WHEN the system loads THEN all references to Media Library components SHALL be removed from the main navigation array

### Requirement 2: Remove Campaigns Tab

**User Story:** As a CRM administrator, I want to remove the Campaigns tab from the navigation, so that the interface is simplified and focuses on direct customer relationship management.

#### Acceptance Criteria

1. WHEN the user views the sidebar navigation THEN the system SHALL NOT display the "Campaigns" tab
2. WHEN the user attempts to access /campaigns route THEN the system SHALL redirect to the dashboard or show a 404 page
3. WHEN the navigation is rendered THEN the system SHALL maintain proper spacing and visual hierarchy without the Campaigns item
4. WHEN the user views the collapsed sidebar THEN the Campaigns icon SHALL NOT be visible
5. WHEN the system loads THEN all references to Campaigns components SHALL be removed from the main navigation array

### Requirement 3: Add Google Meet Channel Integration

**User Story:** As a sales representative, I want to configure Google Meet as a communication channel, so that I can schedule and manage video meetings directly from the CRM system.

#### Acceptance Criteria

1. WHEN the user accesses the Channels page THEN the system SHALL display a Google Meet channel card with appropriate branding and icon
2. WHEN the user views the Google Meet channel THEN the system SHALL show features including "Video meetings", "Calendar integration", "Meeting recordings", and "Screen sharing"
3. WHEN the user clicks configure on Google Meet THEN the system SHALL open a configuration dialog with Google OAuth setup fields
4. WHEN the user connects Google Meet THEN the system SHALL store the connection status and display it as "connected"
5. WHEN Google Meet is connected THEN the system SHALL show meeting statistics and last sync information
6. WHEN the user enables Google Meet THEN the system SHALL allow toggling the channel on/off via a switch control

### Requirement 4: Add Google Sheets Channel Integration

**User Story:** As a data analyst, I want to configure Google Sheets as a data connection, so that I can sync CRM data with spreadsheets for reporting and analysis.

#### Acceptance Criteria

1. WHEN the user accesses the Channels page THEN the system SHALL display a Google Sheets channel card with appropriate branding and icon
2. WHEN the user views the Google Sheets channel THEN the system SHALL show features including "Data sync", "Automated reports", "Real-time updates", and "Custom formulas"
3. WHEN the user clicks configure on Google Sheets THEN the system SHALL open a configuration dialog with Google OAuth setup and sheet selection options
4. WHEN the user connects Google Sheets THEN the system SHALL store the connection status and display it as "connected"
5. WHEN Google Sheets is connected THEN the system SHALL show sync statistics and last update information
6. WHEN the user enables Google Sheets THEN the system SHALL allow toggling the connection on/off via a switch control

### Requirement 5: Update Channel Configuration Interface

**User Story:** As a system administrator, I want the channel configuration to support Google services authentication, so that users can securely connect their Google accounts.

#### Acceptance Criteria

1. WHEN the user configures Google Meet THEN the system SHALL provide OAuth 2.0 authentication flow with appropriate scopes
2. WHEN the user configures Google Sheets THEN the system SHALL provide OAuth 2.0 authentication flow with spreadsheet access permissions
3. WHEN Google services are configured THEN the system SHALL validate the connection and display appropriate status indicators
4. WHEN authentication fails THEN the system SHALL display clear error messages with troubleshooting guidance
5. WHEN the user disconnects Google services THEN the system SHALL revoke tokens and update the connection status

### Requirement 6: Maintain Navigation Consistency

**User Story:** As a CRM user, I want the navigation to remain intuitive and well-organized after the modifications, so that I can efficiently access all available features.

#### Acceptance Criteria

1. WHEN the navigation is modified THEN the system SHALL maintain consistent spacing and visual hierarchy
2. WHEN tabs are removed THEN the system SHALL ensure remaining navigation items are properly aligned and spaced
3. WHEN the user views the sidebar THEN the system SHALL display navigation items in logical order (Dashboard, Leads, Companies, Contacts, AI Agents, Channels)
4. WHEN the sidebar is collapsed THEN the system SHALL maintain proper icon alignment and spacing
5. WHEN the user navigates between pages THEN the system SHALL maintain consistent active state styling

### Requirement 7: Update Channel Statistics and Overview

**User Story:** As a sales manager, I want the channel overview to reflect the new Google integrations, so that I can monitor all communication channels from a single dashboard.

#### Acceptance Criteria

1. WHEN Google Meet is connected THEN the system SHALL include it in the "Connected Channels" count
2. WHEN Google Sheets is connected THEN the system SHALL include it in the "Connected Channels" count
3. WHEN Google services have activity THEN the system SHALL include their usage in the "Total Messages" or equivalent metrics
4. WHEN the user views channel statistics THEN the system SHALL display accurate counts reflecting all available channels
5. WHEN Google services are enabled THEN the system SHALL include them in the "Active Integrations" count

### Requirement 8: Preserve Existing Channel Functionality

**User Story:** As a CRM user, I want all existing channel configurations to remain functional after the modifications, so that my current integrations continue to work without interruption.

#### Acceptance Criteria

1. WHEN the system is updated THEN existing channels (Email, WhatsApp, SMS, Facebook, LinkedIn, Twitter) SHALL remain fully functional
2. WHEN the user views existing channels THEN their configuration, status, and statistics SHALL be preserved
3. WHEN the user interacts with existing channels THEN all current functionality SHALL work as before
4. WHEN the channels page loads THEN existing channel cards SHALL display in their current format alongside new Google integrations
5. WHEN the user manages channels THEN the existing toggle, configure, and test functionality SHALL remain unchanged