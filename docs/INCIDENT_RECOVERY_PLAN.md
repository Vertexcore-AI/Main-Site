# 🛑 INCIDENT RECOVERY & SYSTEM REBUILD PLAN
## Linux Server Compromise (Laravel + Node.js + MySQL VPS)

**Asset:** vmi2924948  
**Status:** Confirmed Root Compromise  
**Severity:** CRITICAL  
**Action Type:** Full System Rebuild Required  

---

# 1. 📌 INCIDENT SUMMARY

The server has been fully compromised at the root level.

## Key findings:
- Multiple unauthorized SSH logins from external IPs
- Root access obtained via password + SSH keys
- Persistent attacker presence across multiple days
- Malicious binary detected: `/FP1iiWXN`
- Active sessions still observed during investigation
- MySQL users exposed with remote access (`Host='%'`)
- Long-lived attacker shell sessions confirmed

---

# 2. 🧠 ROOT CAUSE (LIKELY)

## Primary Entry Point:
- Weak or exposed SSH authentication (root login enabled)

## Contributing Factors:
- Password-based SSH access enabled
- Root login allowed over SSH
- No IP restriction or fail2ban protection
- MySQL users allowed remote access (`%` wildcard)
- Likely credential exposure from `.env` files

---

# 3. 🚨 IMPACT ASSESSMENT

## Affected Systems:
- Full OS (Ubuntu server)
- SSH authentication system
- MySQL databases (all tenants)
- Laravel + Node.js applications
- Web server (Nginx/Apache stack)

## Risk Level:
- 🔴 Full system integrity loss
- 🔴 Possible data exfiltration (cannot be ruled out)
- 🔴 Credential compromise likely
- 🔴 Persistent backdoor presence confirmed

---

# 4. 📦 CONFIRMED INDICATORS OF COMPROMISE (IOCs)

## Malicious Files:
- `/FP1iiWXN` (suspicious ELF binary)

## Suspicious IPs:
- 111.223.178.150
- 111.223.180.25
- 175.157.232.166
- 112.134.187.129
- 123.231.85.112
- 112.134.173.162 (active session observed)

## SSH Evidence:
- Repeated root login attempts
- ED25519 key fingerprint reused across sessions

## Database Exposure:
- MySQL users with `%` host access:
  - admin@%
  - perk_admin@%
  - perk_remote@%

---

# 5. 🧯 CONTAINMENT STATUS

## Completed:
- Log analysis
- Active session detection
- IOC collection
- Database structure verification

## Pending:
- Full system isolation
- Forensic disk snapshot
- Credential rotation
- Clean rebuild execution

---

# 6. 🧹 RECOVERY STRATEGY (RECOMMENDED APPROACH)

## ⚠️ DO NOT CLEAN THE EXISTING SERVER
System is not trustworthy.

---

# 7. 🏗️ CLEAN REBUILD PLAN (MANDATORY)

## Step 1 — Provision New Server
- Fresh Ubuntu 22.04/24.04 install
- No migration from old system

---

## Step 2 — Secure Base Setup

### SSH Hardening:
- Disable root login
- Disable password authentication
- Enable key-only authentication

```bash
PermitRootLogin no
PasswordAuthentication no
````

### Firewall:

* Allow only required ports (22, 80, 443)

---

## Step 3 — Install Stack

* Nginx (single entry proxy)
* PHP-FPM (Laravel)
* Node.js (PM2 or systemd)
* MySQL (fresh install only)

---

## Step 4 — Application Restore (GitHub ONLY)

### Allowed:

* Laravel source code
* Node.js applications
* frontend assets

### NOT allowed:

* `.env`
* `vendor/`
* `node_modules/`
* cache files

```bash
git clone <clean-repo>
cp .env.example .env
composer install
npm install
```

---

## Step 5 — Database Restore

### Use only verified dump:

```bash
mysql -u root -p < clean_backup.sql
```

### Immediately after restore:

* Rotate all DB passwords
* Remove wildcard DB users (`%` hosts)

---

## Step 6 — MySQL Hardening

```sql
DELETE FROM mysql.user WHERE Host='%';
FLUSH PRIVILEGES;
```

* Bind MySQL to localhost only:

```
bind-address = 127.0.0.1
```

---

# 8. 🔐 SECURITY HARDENING (POST REBUILD)

## SSH Protection:

* Install fail2ban
* Disable root SSH
* Use non-standard user

## System Security:

* Automatic security updates
* Audit logging enabled
* File integrity monitoring

## Web Security:

* Laravel `.env` outside web root
* No public database access
* Strict file permissions

---

# 9. 🧬 GITHUB DEPLOYMENT POLICY

## Allowed:

* Clean version-controlled source code

## Required checks before deployment:

* No `.env` committed
* No base64 encoded payloads
* No obfuscated PHP/JS
* No unknown binaries

---

# 10. 📊 FINAL SECURITY POSTURE

After rebuild:

| Layer           | Status     |
| --------------- | ---------- |
| OS              | Clean      |
| SSH             | Hardened   |
| Database        | Isolated   |
| App Code        | Git-based  |
| External Access | Restricted |

---

# 11. 🧠 FINAL CONCLUSION

This incident represents a:

> 🔴 FULL ROOT COMPROMISE WITH LIKELY DATA ACCESS AND PERSISTENT BACKDOOR INSTALLATION

The only safe resolution is:

> ✔ Complete system rebuild
> ✔ Git-based application restoration
> ✔ Database re-import from verified dumps
> ✔ Full credential rotation

---

# 12. 🚀 NEXT STEPS

* Build new secure server
* Restore GitHub apps
* Import clean DB dump
* Rotate all secrets
* Deploy monitoring + alerting

```

---
