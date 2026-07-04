# CRESCO SCIENTIAM 5.0 — Firestore Schema

This is the data contract every page script codes against. Collection name
constants live in `firebase-config.js` (`COLLECTIONS`) — never hardcode a
collection string in a page script.

---

## `users`  (doc id = Firebase Auth UID)
Staff/admin accounts only. Schools are **not** stored here — see `schools`.
Only Super Admin can write to this collection (enforced by security rules).

| field | type | notes |
|---|---|---|
| `uid` | string | mirrors doc id |
| `name` | string | |
| `email` | string | |
| `role` | string | one of `ROLES` in firebase-config.js |
| `permissions` | map<string, bool> | fine-grained overrides, e.g. `{ manageGallery: true, manageSponsors: false }` |
| `assignedEvent` | string \| null | event id, set for `event_head` |
| `department` | string \| null | e.g. `"Design Team"`, for `role_head` / team page |
| `status` | string | `"active"` \| `"deactivated"` |
| `createdBy` | string | uid of Super Admin who created this account |
| `createdAt` | timestamp | |
| `lastLogin` | timestamp \| null | |

## `schools`  (doc id = auto id, also stored as `schoolId` field, human-readable e.g. `CS5-DEL-014`)

| field | type | notes |
|---|---|---|
| `schoolId` | string | unique, QR-encoded |
| `schoolName` | string | |
| `logoUrl` | string | Cloudinary/Storage URL |
| `address`, `city`, `state` | string | |
| `principalName` | string | |
| `teacherCoordinator` | map | `{ name, contact, email }` |
| `studentCoordinator` | map | `{ name, contact, email }` |
| `loginEmails` | array<string> | max 2 unless `extraEmailsApproved` |
| `extraEmailsRequested` | bool | |
| `extraEmailsApproved` | bool | |
| `status` | string | `"pending"` \| `"verified"` \| `"approved"` \| `"rejected"` |
| `qrCodeUrl` | string | generated on approval |
| `createdAt` | timestamp | |
| `approvedAt` | timestamp \| null | |
| `approvedBy` | string \| null | Super Admin uid |

## `students`  (doc id = auto id)

| field | type | notes |
|---|---|---|
| `schoolId` | string | FK → schools.schoolId |
| `qrId` | string | unique participant QR |
| `name`, `grade`, `section` | string | |
| `photoUrl`, `idUrl` | string | |
| `emergencyContact` | map | `{ name, phone, relation }` |
| `medicalInfo` | string | optional |
| `events` | array<string> | event ids selected |
| `attendance` | map<eventId, bool> | |
| `certificatesIssued` | array<string> | certificate ids |

## `events`  (doc id = slug, e.g. `corpus-vestigium`)

| field | type | notes |
|---|---|---|
| `name` | string | e.g. `"Corpus Vestigium"` |
| `tagline` | string | e.g. `"Forensics"` |
| `theme` | string | e.g. `"Crime Investigation Laboratory"` |
| `description` | string | |
| `rulesUrl` | string | PDF in Storage |
| `venue` | string | |
| `schedule` | map | `{ date, reportingTime, startTime, endTime }` |
| `eventHeadUid` | string \| null | |
| `maxTeamSize` | number | |
| `status` | string | `"open"` \| `"closed"` \| `"live"` \| `"completed"` |

## `registrations`  (doc id = `${schoolId}_${eventId}`)

| field | type | notes |
|---|---|---|
| `schoolId`, `eventId` | string | |
| `studentIds` | array<string> | |
| `status` | string | `"pending"` \| `"confirmed"` \| `"waitlisted"` |
| `submittedAt` | timestamp | |

## `announcements`, `circulars`
`{ title, body, fileUrl?, audience: "all"|"schools"|"staff", pinned: bool, createdBy, createdAt }`

## `certificates`
`{ studentId, eventId, type: "participation"|"winner"|"volunteer", pdfUrl, qrVerifyId, issuedAt }`

## `sponsors`
`{ name, logoUrl, tier: "title"|"gold"|"silver"|"partner", websiteUrl, order }`

## `gallery`
`{ imageUrl, caption, category, uploadedBy, createdAt, is360: bool }`

## `team`
`{ name, role, department, bio, photoUrl, linkedin, email, order }`
Departments: Core Team, Teacher In-Charge, Faculty, Volunteers, Logistics,
Design Team, Photography, Technical Team.

## `tickets`
`{ schoolId, subject, message, status: "open"|"answered"|"closed", thread: array<{sender, message, timestamp}>, createdAt }`

## `activityLogs`
`{ actorUid, actorName, action, targetType, targetId, timestamp }`
Written by every admin-write action for the real-time audit trail.

## `settings`  (single doc: `settings/festival`)
`{ festivalStartDate: timestamp, festivalEndDate: timestamp, registrationOpen: bool, venueMapUrl, contactEmail, contactPhone }`

---

## Security model (summary — enforced in `firestore.rules`, not shown here)
- `users`: readable only by the authenticated user's own doc + Super Admin; writable only by Super Admin.
- `schools`: a school account can read/write only its own doc (`request.auth.uid in resource.data.loginEmails`-mapped-uid); staff roles get read access per `permissions`.
- `students`, `registrations`: scoped to the owning `schoolId`, plus staff with the matching permission flag.
- `activityLogs`: append-only, no client-side deletes.