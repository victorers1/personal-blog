---
title: 'Cyber Attacks'
description: "'I'm starting with the man in the middle' -- Michael Jackson"
date: 2026-11-18
draft: true
---

## Intro

We can divide cyber attacks into two type: **passive** and **active**.

The main difference is:

- **Passive**: attacker observes and collects information without communication interference
  - Passive Eavesdropping
  - Traffic Analysis

- **Active**: attacker does not just observe the communication, but interferes or interrupts some functionality
  - Active Eavesdropping.
  - Masquerade.
  - Replay attack.
  - Denial of Service.

## Passive Attacks

**Passive Eavesdropping**: to intercept or monitor a communication without modifying or interrupting it.

An attacker connected to the same network can collect:

- Recent pages
- Non-encripted info
- Forms
- Credentials, when transmitted without protection

(AI: Make MERMAID Chart)

**Traffic Analysis**: consists in analyzing a communication in order to infer something about it. The attacker do not necesseraly knows the content of the messages, but can make conclusions about observed patterns.

An attacker doesn't knows exactly what is the message but can observe:

- Peak consumption time
- Volume of data
- Connections frequency
- Sessions duration
- Traffic origin and destiny

With these info they can know:

- Which server is more used
- There is a maintenance in course
- A specific team is doing a certain task
- If there is an incommon activity in a certain day

(AI: Make MERMAID Chart)

## Active Attacks

**Active Eavesdropping**: intercepts a communication with the possibility of modifying its content. Most known example is the Man-in-the-Middle attack.

(AI: Make MERMAID Chart about MITM)

An attacker can:

- Intercept messages
- Modify transmitted info
- Redirect requests
- Insert content in the communication

**Masquerade** or **Spoofing**: consists in an attacker disguising itself into an legitimate suer, device or entity.

For example, if an attacker obtain some employee credentials, they can use it to:

- Access internal systems
- Talk in behalf of others
- Send fake e-mails

Examples of spoofing:

- IP Spoofing: fakes an origin's IP address to make a package look like it is from a different device.

- ARP Spoofing: sends fake ARP messages in order to associate your MAC to the IP of another device. That let you intercept local network traffic.

- Email Spoofing: fake the sender of an e-mail in order to make a message look like it came from another person.

- DNS Spoofing: manipulate DNS responses aiming to redirect the victim to an IP controlled by an attacker.

**Replay attack**: occurs when an attacker capture a legitimate message or request to resend it later to the same destiny in order to reproduce a anwser.

(AI: make MERMAID chart about reply attack)

How to prevent:

- Timestamps in messages
- Single use tokens
- Session expiration mechanisms
- Single-time transaction identifiers

**Denial of Service (DoS)**: consists in making a service fully overwhelmed until it is unavailable to its legitimate users.

The attacker usually explores a vulnerability or consumes all the server resources in order to interrupt its normal functionality.

An important difference between DoS x DDoS:

| DoS | DDoS |
| -- | -- |
| Denial of Service | Distributed Denial of Service |
| Origin is a single source | Origin is multiple sources |
| Aim is to make service unavailable | Aim is also to make service unavailable |
| Can be done from a single machine | Usually make use of a botnet |

## Related concepts

**Sniffing**: is a technique of capturing and analysing traffic packages in a network.

A well-known tool for sniffing is **Wireshark**.

Important: Sniffing be can used by admins to diagnose network problems. The technique is not malicious by itself.

**Man-in-the-Middle**: occcurs when an attacker position theirselves in the middle of a communication, intercepting it and potencially monitoring, modifying or redirecting it.
