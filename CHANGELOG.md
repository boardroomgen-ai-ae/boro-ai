# Changelog

All notable changes to this repository (documentation and examples) are listed here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

The hosted service is versioned separately. Public interfaces only change by **addition**: the MCP server is `1.x` and the REST API is `v1`. Anything that would break an existing integration gets a new version.

## [Unreleased]

## [0.1.0]: 2026-10-09

### Added
- README in English and Russian: what Revenue Control and Boro are, MCP quick start, roadmap.
- MCP documentation: overview, security model, error codes, and setup guides for Claude Code, Claude Desktop, Cursor and ChatGPT / OpenAI.
- One page per MCP read tool (13 tools).
- REST API v1 reference.
- Examples: curl, JavaScript, Python, website chat widget, n8n and Make templates, MCP client configs.
- `scripts/check-no-secrets.mjs`: a pre-publish check for credentials, personal data and internal identifiers.
- License (Apache 2.0), security policy, contributing guide, code of conduct, issue templates.
