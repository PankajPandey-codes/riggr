# Agent Orkestrasyonu

## Mevcut Agent'lar

RIGGR agent'ları `riggr@riggr` eklentisiyle birlikte gelir, `~/.claude/agents/` dizininde bulunmaz.
Agent aracıyla eklenti kapsamlı bir `subagent_type` ile çağrılır:

```text
Agent(subagent_type: "riggr:planner", prompt: "...")
```

| Agent | Amaç | Ne Zaman Kullanılır |
|-------|---------|-------------|
| riggr:planner | Uygulama planlaması | Karmaşık özellikler, refactoring |
| riggr:architect | Sistem tasarımı | Mimari kararlar |
| riggr:tdd-guide | Test odaklı geliştirme | Yeni özellikler, hata düzeltmeleri |
| riggr:code-reviewer | Kod incelemesi | Kod yazdıktan sonra |
| riggr:security-reviewer | Güvenlik analizi | Commit'lerden önce |
| riggr:build-error-resolver | Build hatalarını düzeltme | Build başarısız olduğunda |
| riggr:e2e-runner | E2E testleri | Kritik kullanıcı akışları |
| riggr:refactor-cleaner | Ölü kod temizliği | Kod bakımı |
| riggr:doc-updater | Dokümantasyon | Dokümanları güncelleme |
| riggr:rust-reviewer | Rust kod incelemesi | Rust projeleri |

68 agent'ın tam listesi için `/riggr:riggr-guide` bölümüne bakın.

## Anlık Agent Kullanımı

Kullanıcı istemi gerekmez:
1. Karmaşık özellik istekleri - **riggr:planner** agent kullan
2. Kod yeni yazıldı/değiştirildi - **riggr:code-reviewer** agent kullan
3. Hata düzeltmesi veya yeni özellik - **riggr:tdd-guide** agent kullan
4. Mimari karar - **riggr:architect** agent kullan

## Paralel Görev Yürütme

Bağımsız işlemler için DAIMA paralel Task yürütme kullan:

```markdown
# İYİ: Paralel yürütme
3 agent'ı paralel başlat:
1. Agent 1: Auth modülü güvenlik analizi
2. Agent 2: Cache sistemi performans incelemesi
3. Agent 3: Utilities tip kontrolü

# KÖTÜ: Gereksiz sıralı yürütme
Önce agent 1, sonra agent 2, sonra agent 3
```

## Çok Perspektifli Analiz

Karmaşık problemler için split role sub-agent'lar kullan:
- Factual reviewer
- Senior engineer
- Security expert
- Consistency reviewer
- Redundancy checker
