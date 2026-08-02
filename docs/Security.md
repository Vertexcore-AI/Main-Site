

# 🛑 SOC INCIDENT RESPONSE REPORT

## Linux Server Compromise (Laravel / Node.js VPS)

**Asset:** vmi2924948
**Environment:** Production VPS (Linux Kernel 6.8.x)
**Detection Date:** 2026-06-24
**Incident Window:** 2026-06-19 → 2026-06-24
**Severity:** 🔴 CRITICAL (Root Compromise Confirmed)
**Status:** Containment In Progress / Rebuild Required

---

# 1. 📌 Executive Summary

The server has been confirmed as **fully compromised at root level**. Multiple unauthorized SSH sessions were observed from several external IPs over multiple days, followed by execution of a suspicious binary (`/FP1iiWXN`) consistent with **Linux crypto-mining malware activity**.

Evidence confirms:

* Multiple successful SSH logins (password + public key)
* Unauthorized persistent SSH key access
* Active malicious process execution (`FP1iiWXN`)
* Ongoing remote sessions during investigation
* Possible multi-actor or botnet-based access

👉 **Conclusion: System integrity is not trustworthy. Full OS rebuild is required.**

---

# 2. 🧠 Attack Overview (High-Level Kill Chain)

## MITRE ATT&CK Mapping (Simplified)

| Phase                | Technique                                   |
| -------------------- | ------------------------------------------- |
| Initial Access       | Valid Accounts (T1078), Brute Force (T1110) |
| Execution            | Malicious Binary Execution (T1204)          |
| Persistence          | SSH Authorized Keys (T1098)                 |
| Privilege Escalation | Root Account Compromise                     |
| Defense Evasion      | Obfuscated ELF binary                       |
| Command & Control    | External TCP connections                    |
| Impact               | Resource Hijacking (Crypto Mining)          |

---

# 3. ⏱️ Incident Timeline (Reconstructed)

## 🔴 2026-06-21 — Initial Active Compromise Window

Multiple successful SSH logins detected:

* `111.223.178.150` → repeated root password access
* `111.223.180.25` → public key authentication
* `175.157.232.166` → repeated ED25519 key-based sessions

📌 Indicates:

* brute force success OR credential leak
* immediate post-login persistence actions

---

## 🟠 2026-06-21 → 2026-06-23 — Sustained Access Phase

Additional actors observed:

* `112.134.187.129`
* `123.231.85.112`
* `175.157.72.26`

Behavior:

* long-lived SSH sessions (1–3 hours)
* repeated root shell access (`pts/*`)
* likely manual attacker interaction

---

## 🔵 2026-06-23 — Expanded Access + Key-Based Persistence

* SSH key authentication observed from:

  * `172.208.127.243`
  * `20.12.182.162`
* Shared ED25519 fingerprint indicates persistent attacker key:

  ```
  SHA256: tnGlPSuDohdGIuGl2lole0Oh6sIt1r2hmiM1U0w/w2E
  ```

👉 This strongly indicates **installed backdoor SSH key in authorized_keys**

---

## 🔴 2026-06-24 — Active Compromise Confirmed

* Active sessions from:

  * `112.134.173.162` (CURRENT ACTIVE CONNECTION)
* Suspicious process detected:

  ```
  /FP1iiWXN (ELF binary ~2.6MB)
  ```
* Outbound connections to unknown IPs observed

---

# 4. 🌐 Confirmed Threat Actor IPs (IOCs)

## 🔴 High Confidence Malicious IPs

| IP Address      | Role                                       |
| --------------- | ------------------------------------------ |
| 111.223.178.150 | Initial brute-force entry                  |
| 111.223.180.25  | SSH key-based access                       |
| 175.157.232.166 | Persistent attacker node (primary control) |
| 112.134.187.129 | Interactive attacker session               |
| 123.231.85.112  | Secondary access operator                  |
| 112.134.173.162 | ACTIVE SESSION (live compromise)           |
| 176.65.139.181  | SSH session / possible relay node          |

---

# 5. 🧬 Indicators of Compromise (IOCs)

## 🗂 File Artifacts

* `/FP1iiWXN` (suspicious ELF binary, miner-like behavior)

---

## 🔑 SSH Persistence Evidence

* ED25519 key fingerprint:

  ```
  SHA256:tnGlPSuDohdGIuGl2lole0Oh6sIt1r2hmiM1U0w/w2E
  ```

* Likely location:

  ```
  /root/.ssh/authorized_keys
  ```

---

## 🌐 Network Indicators

* Unknown outbound TCP connections
* Suspicious connections to:

  * port 443 (normal disguise traffic)
  * non-standard ports (mining/C2 behavior suspected)

---

## ⚙️ Process Indicators

* `FP1iiWXN` running under root
* `sshd` sessions from multiple foreign IPs
* `nc` (netcat) usage detected in CLOSE-WAIT states

---

# 6. 💥 Impact Assessment

## Affected Assets:

* Full OS integrity compromised
* Root account fully exposed
* SSH authentication trust broken
* Web stack at risk (Laravel + Node.js)

## Potential Data Exposure:

* `.env` files (Laravel credentials)
* Database credentials
* Application source code
* SSH private keys

## Operational Impact:

* CPU hijacking (crypto mining suspected)
* Server instability
* Possible data exfiltration (unconfirmed)

---

# 7. 🧠 Root Cause Analysis (Preliminary)

## Most Likely Entry Point:

* Weak or exposed SSH authentication (password-based root access)

OR

* Credential leak from:

  * `.env` file exposure
  * reused SSH keys
  * compromised CI/CD or dev machine

---

## Attack Progression:

1. Initial SSH compromise (111.223.178.150)
2. Root access gained
3. SSH key persistence installed
4. Multiple operator access enabled
5. Malware deployed (`FP1iiWXN`)
6. Long-term access maintained

---

# 8. 🧯 Containment Status

## Completed:

* Log extraction
* Session identification
* IOC identification

## In Progress:

* Active session analysis
* Persistence verification

## Not Safe:

* System integrity validation
* Application trust verification

---

# 9. 🚨 Recommended Actions (MANDATORY)

## 🔴 Immediate (NOW)

* Disconnect server from internet
* Block all listed IPs at firewall level
* Terminate all SSH sessions

---

## 🟠 Short Term

* Extract forensic snapshot (logs only)
* Preserve `/var/log/` for evidence
* Backup only application code (NOT system files)

---

## 🔵 Long Term (CRITICAL)

### FULL REBUILD REQUIRED

* Reinstall OS (Ubuntu 22.04/24.04)
* New SSH keys only
* Disable password login permanently
* Enable UFW + fail2ban

---

# 10. 🔐 Security Improvements (Post-Rebuild)

## Infrastructure Hardening

* Single reverse proxy (Nginx only)
* No root SSH access
* IP allowlisting for admin access

## Application Hardening

* Laravel `.env` outside web root
* Rotate all secrets (DB, API keys, JWT)
* Node apps run under non-root users

## Monitoring

* auditd enabled
* file integrity monitoring
* login anomaly alerts

---

# 11. 📎 Conclusion

This incident is classified as:

> 🔴 **Full Root-Level Server Compromise with Persistent SSH Backdoor + Malware Execution**

The environment is **not recoverable with cleanup alone**. A **clean rebuild with hardened architecture is mandatory**.

---

