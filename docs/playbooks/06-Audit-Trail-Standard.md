# Playbook 06: Audit Trail and Evidence Standard

Goal: make every key action defensible with a clear timeline and export pack.

## What an audit trail is (simple)

A chronological log of actions inside the system:

- who did it
- what changed
- when it happened
- what evidence exists

## Events to log (minimum)

### Account and access

- login success and failure
- role changed
- permissions changed
- password reset requested and completed

### Customer and vehicle

- customer created and edited
- vehicle created and edited
- document uploaded, downloaded, deleted

### Reservation and deposit

- reservation created
- deposit requested
- deposit paid (gateway result)
- deposit refunded or reversed
- reservation cancelled

### Approvals

- approval requested
- approved
- rejected
- override used

### Exports

- evidence export generated
- export downloaded
- export shared (if supported)

## Audit event schema (recommended)

Store:

- event_id
- timestamp_utc
- actor_user_id
- actor_role
- action_type (string)
- entity_type (reservation, deposit, vehicle, file)
- entity_id
- before (json)
- after (json)
- ip_address (if available)
- user_agent (if available)
- correlation_id (links a chain of events)

## Evidence standards

### Naming

Use:

- <entity>-<date>-<short_description>-<random_id>

Example:

- reservation-2026-03-02-deposit-receipt-8f3a2

### File rules

- allow: pdf, jpg, png, webp
- set max size
- strip dangerous metadata where possible
- generate thumbnails for images
- store original + derived versions separately

### Evidence required points

For a deposit flow:

- deposit receipt
- payment provider transaction id
- timeline of approvals
- who sent the receipt
- refund timeline if refund happens

## Evidence export pack (zip structure)

evidence-export/

- README.txt
- summary.json
- timeline.csv
- reservation.json
- customer.json
- vehicle.json
- receipts/
  - deposit-receipt.pdf
- uploads/
  - photo-01.jpg
  - id-document.pdf
- hashes/
  - sha256.txt

README.txt includes:

- what is inside
- export generated date and time
- any redactions applied
- contact for verification

## Redaction policy

- hide personal data if the export is for external parties
- keep full data for internal authorized roles
- log that redaction was applied

## Retention (high level)

- define retention per document type
- define deletion rules
- define who can delete and when
- log every deletion attempt

## UI requirements

- timeline view per reservation and per vehicle
- filter by action type
- search by customer or vehicle
- export button restricted to manager role
- every export is logged

## Definition of done

- events show correct actor and timestamp
- export pack generated with correct structure
- download action logged
- audit is tamper resistant (append only approach preferred)
