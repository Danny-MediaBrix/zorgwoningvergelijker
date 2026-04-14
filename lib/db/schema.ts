import { sqliteTable, text, integer, uniqueIndex, index } from "drizzle-orm/sqlite-core";

// ─── Bestaande tabellen ───────────────────────────────────────────────

export const listings = sqliteTable("listings", {
  id: text("id").primaryKey(),
  source: text("source").notNull(),
  sourceId: text("source_id").notNull(),
  sourceUrl: text("source_url").notNull(),
  woningtype: text("woningtype"),
  title: text("title").notNull(),
  description: text("description"),
  price: integer("price"), // prijs in centen, null = "prijs op aanvraag"
  priceLabel: text("price_label"), // "v.a.", "vraagprijs", "bieden"
  location: text("location"),
  province: text("province"),
  surfaceM2: integer("surface_m2"),
  buildYear: integer("build_year"),
  condition: text("condition"), // 'nieuw', 'gebruikt', 'goed', 'redelijk'
  sellerType: text("seller_type"), // 'particulier', 'bedrijf'
  transport: text("transport"), // 'inclusief', 'exclusief', 'onbekend'
  images: text("images"), // JSON array van image URLs
  scrapedAt: text("scraped_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  isActive: integer("is_active").default(1),
}, (table) => [
  uniqueIndex("idx_listings_source_sourceid").on(table.source, table.sourceId),
  index("idx_listings_active_woningtype").on(table.isActive, table.woningtype),
  index("idx_listings_scraped_at").on(table.scrapedAt),
  index("idx_listings_price").on(table.price),
]);

export const scrapeLogs = sqliteTable("scrape_logs", {
  id: text("id").primaryKey(),
  source: text("source").notNull(),
  startedAt: text("started_at").notNull(),
  finishedAt: text("finished_at"),
  listingsFound: integer("listings_found"),
  listingsNew: integer("listings_new"),
  error: text("error"),
  status: text("status").notNull(), // 'running', 'success', 'error'
});

// ─── Authenticatie ────────────────────────────────────────────────────

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().$type<"aanbieder" | "admin">(),
  emailVerified: integer("email_verified").default(0),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  uniqueIndex("idx_users_email").on(table.email),
]);

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(), // hashed session token
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [
  index("idx_sessions_user_id").on(table.userId),
]);

export const passwordResetTokens = sqliteTable("password_reset_tokens", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: text("expires_at").notNull(),
  usedAt: text("used_at"),
}, (table) => [
  index("idx_password_reset_user").on(table.userId),
]);

// ─── Aanbieders ───────────────────────────────────────────────────────

export const aanbieders = sqliteTable("aanbieders", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  bedrijfsnaam: text("bedrijfsnaam").notNull(),
  beschrijving: text("beschrijving"),
  logoUrl: text("logo_url"),
  vestigingsplaats: text("vestigingsplaats"),
  provincie: text("provincie"),
  werkgebied: text("werkgebied"), // JSON array
  website: text("website"),
  telefoon: text("telefoon"),
  contactEmail: text("contact_email"),
  reviewLink: text("review_link"),
  reviewScore: integer("review_score"), // ×10 opgeslagen (bijv. 45 = 4.5)
  reviewCount: integer("review_count"),
  status: text("status").notNull().$type<"pending" | "approved" | "rejected">().default("pending"),
  rejectionReason: text("rejection_reason"),
  approvedAt: text("approved_at"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  uniqueIndex("idx_aanbieders_user_id").on(table.userId),
  uniqueIndex("idx_aanbieders_slug").on(table.slug),
  index("idx_aanbieders_status").on(table.status),
]);

export const certificaten = sqliteTable("certificaten", {
  id: text("id").primaryKey(),
  aanbiederId: text("aanbieder_id").notNull().references(() => aanbieders.id, { onDelete: "cascade" }),
  naam: text("naam").notNull(),
  bewijsUrl: text("bewijs_url").notNull(), // Vercel Blob URL
  createdAt: text("created_at").notNull(),
}, (table) => [
  index("idx_certificaten_aanbieder").on(table.aanbiederId),
]);

export const portfolio = sqliteTable("portfolio", {
  id: text("id").primaryKey(),
  aanbiederId: text("aanbieder_id").notNull().references(() => aanbieders.id, { onDelete: "cascade" }),
  titel: text("titel").notNull(),
  afbeeldingUrl: text("afbeelding_url").notNull(),
  woningType: text("woning_type"),
  locatie: text("locatie"),
  createdAt: text("created_at").notNull(),
}, (table) => [
  index("idx_portfolio_aanbieder").on(table.aanbiederId),
]);

// ─── Woningtype-selecties (gratis, onderdeel van profiel) ──────────────

export const woningtypeSelecties = sqliteTable("woningtype_selecties", {
  id: text("id").primaryKey(),
  aanbiederId: text("aanbieder_id").notNull().references(() => aanbieders.id, { onDelete: "cascade" }),
  woningtypeSlug: text("woningtype_slug").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [
  uniqueIndex("idx_selecties_aanbieder_woningtype").on(table.aanbiederId, table.woningtypeSlug),
]);

// ─── Aanbieder Abonnement (vaste maandprijs) ─────────────────────────

export const aanbiederSubscriptions = sqliteTable("aanbieder_subscriptions", {
  id: text("id").primaryKey(),
  aanbiederId: text("aanbieder_id").notNull().references(() => aanbieders.id, { onDelete: "cascade" }),
  status: text("status").notNull().$type<"active" | "cancelled" | "payment_failed">().default("active"),
  mollieSubscriptionId: text("mollie_subscription_id"),
  startedAt: text("started_at").notNull(),
  cancelledAt: text("cancelled_at"),
}, (table) => [
  uniqueIndex("idx_aanbieder_sub_aanbieder").on(table.aanbiederId),
  index("idx_aanbieder_sub_status").on(table.status),
]);

// ─── Leads (offerteaanvragen, betaald per stuk) ──────────────────────

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  aanbiederId: text("aanbieder_id").references(() => aanbieders.id, { onDelete: "set null" }),
  naam: text("naam").notNull(),
  email: text("email").notNull(),
  telefoon: text("telefoon"),
  woningtype: text("woningtype"),
  bericht: text("bericht"),
  bron: text("bron"), // 'configurator', 'aanbiederspagina'
  plattegrondUrl: text("plattegrond_url"),
  gefactureerd: integer("gefactureerd").default(0),
  createdAt: text("created_at").notNull(),
}, (table) => [
  index("idx_leads_aanbieder").on(table.aanbiederId),
  index("idx_leads_gefactureerd").on(table.gefactureerd),
]);

export const aanbiedersOccasions = sqliteTable("aanbieders_occasions", {
  id: text("id").primaryKey(),
  aanbiederId: text("aanbieder_id").notNull().references(() => aanbieders.id, { onDelete: "cascade" }),
  titel: text("titel").notNull(),
  beschrijving: text("beschrijving"),
  prijs: integer("prijs"), // centen
  prijsLabel: text("prijs_label"),
  woningtype: text("woningtype"),
  locatie: text("locatie"),
  provincie: text("provincie"),
  oppervlakteM2: integer("oppervlakte_m2"),
  bouwjaar: integer("bouwjaar"),
  conditie: text("conditie"),
  isolatie: text("isolatie"),
  dakType: text("dak_type"),
  fundering: text("fundering"),
  energielabel: text("energielabel"),
  leveringstermijn: text("leveringstermijn"),
  financieringsopties: text("financieringsopties"), // JSON
  images: text("images"), // JSON array Vercel Blob URLs
  status: text("status").notNull().$type<"active" | "inactive" | "expired">().default("active"),
  mollieSubscriptionId: text("mollie_subscription_id"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  index("idx_occasions_aanbieder").on(table.aanbiederId),
  index("idx_occasions_status_woningtype").on(table.status, table.woningtype),
]);

// ─── Betalingen ───────────────────────────────────────────────────────

export const payments = sqliteTable("payments", {
  id: text("id").primaryKey(),
  aanbiederId: text("aanbieder_id").notNull().references(() => aanbieders.id, { onDelete: "cascade" }),
  type: text("type").notNull().$type<"aanbieder_subscription" | "occasion_listing" | "lead">(),
  referenceId: text("reference_id"), // FK naar subscription of occasion
  amount: integer("amount").notNull(), // centen
  currency: text("currency").notNull().default("EUR"),
  molliePaymentId: text("mollie_payment_id"),
  mollieStatus: text("mollie_status"),
  moneybirdInvoiceId: text("moneybird_invoice_id"),
  moneybirdStatus: text("moneybird_status"),
  createdAt: text("created_at").notNull(),
  paidAt: text("paid_at"),
}, (table) => [
  index("idx_payments_aanbieder").on(table.aanbiederId),
  index("idx_payments_mollie").on(table.molliePaymentId),
]);

export const mollieCustomers = sqliteTable("mollie_customers", {
  id: text("id").primaryKey(),
  aanbiederId: text("aanbieder_id").notNull().references(() => aanbieders.id, { onDelete: "cascade" }),
  mollieCustomerId: text("mollie_customer_id").notNull(),
  hasMandateActive: integer("has_mandate_active").default(0),
  createdAt: text("created_at").notNull(),
}, (table) => [
  uniqueIndex("idx_mollie_customers_aanbieder").on(table.aanbiederId),
  uniqueIndex("idx_mollie_customers_mollie_id").on(table.mollieCustomerId),
]);

// ─── Platform Instellingen ────────────────────────────────────────────

export const platformSettings = sqliteTable("platform_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull(),
});

// ─── Lead Dispatches (tracking welke aanbieders leads ontvangen) ─────

export const leadDispatches = sqliteTable("lead_dispatches", {
  id: text("id").primaryKey(),
  leadId: text("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  aanbiederId: text("aanbieder_id").notNull().references(() => aanbieders.id, { onDelete: "cascade" }),
  sentByUserId: text("sent_by_user_id").notNull().references(() => users.id),
  sentAt: text("sent_at").notNull(),
}, (table) => [
  index("idx_lead_dispatches_lead").on(table.leadId),
  index("idx_lead_dispatches_aanbieder").on(table.aanbiederId),
]);

// ─── Document Signing ────────────────────────────────────────────────

export const signedDocuments = sqliteTable("signed_documents", {
  id: text("id").primaryKey(),
  documentUid: text("document_uid").notNull(),
  title: text("title").notNull(),
  documentType: text("document_type").notNull().$type<"contract" | "addendum" | "verwerkersovereenkomst" | "overig">(),
  version: integer("version").notNull().default(1),
  status: text("status").notNull().$type<"draft" | "pending_signature" | "signed" | "expired" | "revoked">().default("draft"),
  aanbiederId: text("aanbieder_id").notNull().references(() => aanbieders.id, { onDelete: "cascade" }),
  createdByUserId: text("created_by_user_id").notNull().references(() => users.id),
  templateId: text("template_id"),
  templateVariables: text("template_variables"), // JSON stringified
  documentHashPresign: text("document_hash_presign"),
  documentHashPostsign: text("document_hash_postsign"),
  signedAt: text("signed_at"),
  signerFullName: text("signer_full_name"),
  signerRole: text("signer_role"),
  draftFileUrl: text("draft_file_url"),
  signedFileUrl: text("signed_file_url"),
  expiresAt: text("expires_at"),
  retentionUntil: text("retention_until"),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => [
  uniqueIndex("idx_signed_documents_uid").on(table.documentUid),
  index("idx_signed_documents_aanbieder").on(table.aanbiederId),
  index("idx_signed_documents_status").on(table.status),
]);

export const signingEvents = sqliteTable("signing_events", {
  id: text("id").primaryKey(),
  eventUid: text("event_uid").notNull(),
  documentId: text("document_id").notNull().references(() => signedDocuments.id, { onDelete: "cascade" }),
  action: text("action").notNull().$type<
    "created" | "sent_for_signature" | "viewed" | "downloaded" |
    "signature_started" | "signed" | "signature_failed" |
    "expired" | "revoked" | "verified" | "verification_failed"
  >(),
  actorType: text("actor_type").notNull().$type<"aanbieder" | "admin" | "system">(),
  actorId: text("actor_id"),
  actorEmail: text("actor_email"),
  actorDisplayName: text("actor_display_name"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  sessionId: text("session_id"),
  documentHashAtEvent: text("document_hash_at_event"),
  metadata: text("metadata"), // JSON stringified
  occurredAt: text("occurred_at").notNull(),
  createdAt: text("created_at").notNull(),
}, (table) => [
  uniqueIndex("idx_signing_events_uid").on(table.eventUid),
  index("idx_signing_events_document").on(table.documentId),
  index("idx_signing_events_occurred").on(table.occurredAt),
]);
