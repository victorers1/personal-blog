---
title: 'Cyber Attacks'
description: "'I'm starting with the man in the middle' -- Michael Jackson"
date: 2026-11-18
draft: true
---

## Intro

We can divide cyber attacks into two types, **passive** and **active**.

- **Passive attacks** involve observing and collecting information without interfering with communication.
  - Passive eavesdropping
  - Traffic analysis
- **Active attacks** involve interfering with communication or disrupting a system's operation.
  - Active eavesdropping
  - Masquerade
  - Replay attacks
  - Denial of service

## Passive Attacks

**Passive eavesdropping** involves intercepting or monitoring communications without modifying or interrupting them.

An attacker who can observe unencrypted network traffic may see:

- Pages users visit
- Information sent in plain text
- Data submitted through forms
- Credentials transmitted without protection

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant Observer as Passive observer
    Client->>Server: Message
    Note over Client,Observer: The observer can see the message in transit.
```

**Traffic analysis** involves examining communication patterns to draw inferences. An attacker can draw conclusions from those patterns even when the contents of the messages are encrypted.

An attacker can observe:

- Peak traffic times
- Data volume
- Connection frequency
- Session duration
- Traffic sources and destinations

These patterns can suggest:

- Which server is used most often
- Whether maintenance is underway
- Whether a particular team is performing a task
- Whether activity on a given day is unusual

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant Observer as Traffic observer
    Client->>Server: Encrypted request
    Server-->>Client: Encrypted response
    Note over Client,Observer: The observer can compare timing, volume, and endpoints.
    Note right of Observer: Patterns may reveal peak usage or unusual activity.
```

## Active Attacks

**Active eavesdropping** involves intercepting communications and potentially modifying their contents. A common example is a man-in-the-middle attack.

```mermaid
sequenceDiagram
    participant Client
    participant Intermediary as Unauthorized intermediary
    participant Server
    Client->>Intermediary: Request intended for the server
    Intermediary->>Server: Relayed request
    Server-->>Intermediary: Response
    Intermediary-->>Client: Relayed response
    Note over Client,Server: The intermediary can observe or modify messages in transit.
```

An attacker can:

- Intercept messages
- Modify transmitted information
- Redirect requests
- Insert content into the communication

A **masquerade attack** involves impersonating a legitimate user, device, or entity. **Spoofing** is one way to carry out this impersonation.

For example, if an attacker obtains an employee's credentials, they can use them to:

- Access internal systems
- Communicate on the employee's behalf
- Send fraudulent emails

Examples of spoofing include:

- **IP spoofing** falsifies a packet's source IP address so that the packet appears to come from a different device.
- **ARP spoofing** uses forged ARP messages to associate one device's IP address with another device's MAC address. This can allow an attacker to intercept local network traffic.
- **Email spoofing** falsifies sender information so that an email appears to come from someone else.
- **DNS spoofing** manipulates DNS responses and can redirect a user to an IP address controlled by an attacker.

A **replay attack** occurs when an attacker captures a legitimate message or request and later resends it to the same destination to try to repeat the original action.

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant Attacker
    Client->>Server: Original request
    Note over Client,Attacker: The attacker observes and copies the request.
    Attacker->>Server: Duplicate request sent later
    Server-->>Attacker: Duplicate rejected when replay protection is enabled
```

Ways to reduce replay risk include:

- Validating message timestamps and rejecting stale requests
- Using single-use tokens
- Expiring sessions to limit the window for replay
- Rejecting duplicate transaction identifiers

A **denial-of-service (DoS)** attack disrupts a service or makes it unavailable to legitimate users.

An attacker may exhaust the service's resources or exploit a vulnerability to interrupt normal operation.

| DoS | DDoS |
| --- | --- |
| Denial of service | Distributed denial of service |
| Can originate from a single source | Originates from multiple sources |
| Aims to disrupt service availability | Aims to disrupt service availability |
| Can be carried out from a single machine | Often uses a botnet |

## Related Concepts

**Sniffing** is the practice of capturing and analyzing network packets. Wireshark is a well-known tool for packet capture and analysis. Network administrators can use sniffing to diagnose network problems.

A **man-in-the-middle attack** occurs when an attacker positions themselves between two communicating parties and intercepts their messages. The attacker can monitor, modify, or redirect those messages.
