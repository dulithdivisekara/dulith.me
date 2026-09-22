-- migrations/0001_initial.sql

-- ─── Projects ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  description TEXT NOT NULL,
  icon       TEXT NOT NULL DEFAULT 'work',
  tags       TEXT NOT NULL DEFAULT '[]',
  github_url TEXT,
  live_url   TEXT,
  image_url  TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Certificates ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS certificates (
  id                TEXT PRIMARY KEY,
  title             TEXT NOT NULL,
  issuer            TEXT NOT NULL,
  description       TEXT,
  date              TEXT NOT NULL,
  certificate_id    TEXT,
  verification_url  TEXT,
  image_url         TEXT,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);
