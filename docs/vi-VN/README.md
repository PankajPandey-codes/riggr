**Ngôn ngữ:** [English](../../README.md) | [Português (Brasil)](../pt-BR/README.md) | [简体中文](../../README.zh-CN.md) | [繁體中文](../zh-TW/README.md) | [日本語](../ja-JP/README.md) | [한국어](../ko-KR/README.md) | [Türkçe](../tr/README.md) | [Русский](../ru/README.md) | **Tiếng Việt** | [ไทย](../th/README.md) | [Deutsch](../de-DE/README.md) | [Українська](../uk-UA/README.md) | [Polski](../pl/README.md) | [বাংলা](../bn/README.md) | [العربية](../ar/README.md)

# RIGGR

![RIGGR - hệ thống hiệu năng cho AI agent harness](../../assets/hero.png)

[![npm riggr-universal](https://img.shields.io/npm/dw/riggr-universal?label=riggr-universal%20weekly%20downloads&logo=npm)](https://www.npmjs.com/package/riggr-universal)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

> **140K+ sao** | **21K+ fork** | **170+ contributor** | **12+ hệ sinh thái ngôn ngữ** | **Anthropic Hackathon Winner**

---

<div align="center">

**Ngôn ngữ / Language / 语言 / 語言 / Dil / Язык**

[English](../../README.md) | [Português (Brasil)](../pt-BR/README.md) | [简体中文](../../README.zh-CN.md) | [繁體中文](../zh-TW/README.md) | [日本語](../ja-JP/README.md) | [한국어](../ko-KR/README.md) | [Türkçe](../tr/README.md) | [Русский](../ru/README.md) | **Tiếng Việt** | [ไทย](../th/README.md) | [Deutsch](../de-DE/README.md) | [Українська](../uk-UA/README.md) | [Polski](../pl/README.md) | [বাংলা](../bn/README.md) | [العربية](../ar/README.md)

</div>

---

**RIGGR là hệ thống tối ưu hiệu năng cho AI agent harness.**

RIGGR không chỉ là một bộ cấu hình. Repo này đóng gói agents, skills, hooks, rules, MCP config, selective install, kiểm tra bảo mật, và workflow vận hành cho Claude Code, Codex, Cursor, OpenCode, Gemini và các harness agent khác.

Trang tiếng Việt này là bản onboarding gọn, được phục hồi từ đóng góp cộng đồng trong PR [#1322](https://github.com/pankajpandey-codes/riggr/pull/1322) và cập nhật để khớp mặt cài đặt hiện tại. README tiếng Anh vẫn là nguồn chuẩn đầy đủ nhất.

---

## Bắt Đầu Nhanh

### Chọn một đường cài đặt duy nhất

Với Claude Code, phần lớn người dùng nên chọn đúng **một** trong hai đường:

- **Khuyến nghị:** cài plugin Claude Code, sau đó copy thủ công chỉ những thư mục `rules/` bạn thật sự cần.
- **Dùng installer thủ công** nếu bạn muốn kiểm soát chi tiết hơn, muốn tránh plugin, hoặc bản Claude Code của bạn không resolve được marketplace tự host.
- **Không chồng nhiều cách cài lên nhau.** Cấu hình dễ hỏng nhất là `/plugin install` trước, rồi chạy tiếp `install.sh --profile full` hoặc `npx riggr-universal install --profile full`.

Nếu bạn đã cài chồng nhiều lần và thấy skill/hook bị trùng, xem [Reset / Gỡ RIGGR](#reset--gỡ-riggr).

### Cài plugin Claude Code

```bash
# Thêm marketplace
/plugin marketplace add https://github.com/pankajpandey-codes/riggr

# Cài plugin
/plugin install riggr@riggr
```

RIGGR có ba định danh công khai khác nhau:

- Repo GitHub: `pankajpandey-codes/riggr`
- Plugin Claude marketplace: `riggr@riggr`
- Gói npm: `riggr-universal`

Các tên này cố ý khác nhau. Plugin Claude Code dùng `riggr@riggr`; npm vẫn dùng `riggr-universal`.

### Copy rules nếu cần

Plugin Claude Code không tự phân phối `rules/`. Nếu bạn đã cài bằng plugin, **đừng** chạy thêm full installer. Hãy copy riêng rule pack bạn muốn:

```bash
git clone https://github.com/pankajpandey-codes/riggr.git
cd RIGGR

mkdir -p ~/.claude/rules/riggr
cp -R rules/common ~/.claude/rules/riggr/
cp -R rules/typescript ~/.claude/rules/riggr/
```

```powershell
git clone https://github.com/pankajpandey-codes/riggr.git
cd RIGGR

New-Item -ItemType Directory -Force -Path "$HOME/.claude/rules/riggr" | Out-Null
Copy-Item -Recurse rules/common "$HOME/.claude/rules/riggr/"
Copy-Item -Recurse rules/typescript "$HOME/.claude/rules/riggr/"
```

Copy cả thư mục ngôn ngữ, ví dụ `rules/common` hoặc `rules/golang`, thay vì copy từng file riêng lẻ.

### Cài thủ công nếu không dùng plugin

Chỉ dùng đường này nếu bạn cố ý bỏ qua plugin:

```bash
npm install
./install.sh --profile full
```

```powershell
npm install
.\install.ps1 --profile full
# hoặc
npx riggr-universal install --profile full
```

Nếu chọn đường thủ công, dừng ở đó. Đừng chạy thêm `/plugin install`.

### Đường low-context / không hooks

Nếu bạn chỉ muốn rules, agents, commands và core workflow skills, dùng profile tối thiểu:

```bash
./install.sh --profile minimal --target claude
```

```powershell
.\install.ps1 --profile minimal --target claude
# hoặc
npx riggr-universal install --profile minimal --target claude
```

Profile này cố ý không cài `hooks-runtime`.

---

## Reset / Gỡ RIGGR

Nếu RIGGR bị trùng, quá xâm lấn, hoặc hoạt động sai, đừng tiếp tục cài đè lên chính nó.

- **Đường plugin:** gỡ plugin trong Claude Code, rồi xoá các rule folder bạn đã copy thủ công dưới `~/.claude/rules/riggr/`.
- **Đường installer/CLI:** từ root repo, preview trước:

```bash
node scripts/uninstall.js --dry-run
```

Sau đó gỡ các file do RIGGR quản lý:

```bash
node scripts/uninstall.js
```

Bạn cũng có thể dùng lifecycle wrapper:

```bash
node scripts/riggr.js list-installed
node scripts/riggr.js doctor
node scripts/riggr.js repair
node scripts/riggr.js uninstall --dry-run
```

RIGGR chỉ xoá file có trong install-state của nó. Nó không xoá file không liên quan.

---

## Tài Liệu Quan Trọng

- [README tiếng Anh](../../README.md) - nguồn chuẩn đầy đủ nhất
- [Hướng dẫn Hermes](../HERMES-SETUP.md)
- [Release notes v2.0.0-rc.1](../releases/2.0.0-rc.1/release-notes.md)
- [Kiến trúc cross-harness](../architecture/cross-harness.md)
- [Troubleshooting](../TROUBLESHOOTING.md)
- [Hook bug workarounds](../hook-bug-workarounds.md)

---

## Dùng Thử

```bash
# Plugin install dùng namespace đầy đủ
/riggr:plan "Thêm xác thực người dùng"

# Manual install giữ dạng slash ngắn
# /plan "Thêm xác thực người dùng"

# Xem plugin đang cài
/plugin list riggr@riggr
```

RIGGR hiện cung cấp hàng chục agent, hơn 200 skill và legacy command shim cho các workflow agent khác nhau. Kiểm tra README tiếng Anh để xem danh sách và hướng dẫn chi tiết nhất.
