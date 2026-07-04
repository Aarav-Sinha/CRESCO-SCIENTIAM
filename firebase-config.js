/**
 * ============================================================================
 * CRESCO SCIENTIAM 5.0 — SHARED FIREBASE CONFIGURATION
 * ============================================================================
 * This is the ONLY shared file in the entire project. Every page imports
 * from this module instead of duplicating Firebase configuration.
 *
 * Usage in any page:
 *   import { auth, db, storage, analytics, FieldValue, serverTimestamp }
 *     from "./firebase-config.js";
 *
 * This file uses the official Firebase CDN (ES module build), so no
 * bundler, npm install, or framework is required — it works as a plain
 * <script type="module"> import, in line with the project's vanilla-only
 * architecture.
 * ============================================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import {
  getAnalytics,
  isSupported as analyticsIsSupported,
  logEvent,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// ----------------------------------------------------------------------------
// Project configuration — Cresco Scientiam 5.0 (Firebase project: cresco-scientiam)
// ----------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyCr7RU1pUOyxV88VEAgJZwEHNupTHCnv98",
  authDomain: "cresco-scientiam.firebaseapp.com",
  projectId: "cresco-scientiam",
  storageBucket: "cresco-scientiam.firebasestorage.app",
  messagingSenderId: "102065794685",
  appId: "1:102065794685:web:bf1bb3506d77a722368b14",
  measurementId: "G-QLQSFRB8ZW",
};

// ----------------------------------------------------------------------------
// Core service singletons
// ----------------------------------------------------------------------------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics only initializes in supported (browser, non-bot) environments,
// so we guard it to avoid console errors in unsupported contexts.
let analytics = null;
analyticsIsSupported().then((supported) => {
  if (supported) analytics = getAnalytics(app);
});

/**
 * Fire-and-forget analytics logger. Safe to call even before analytics
 * has finished initializing (it silently no-ops until ready).
 * @param {string} eventName
 * @param {Object} [params]
 */
function logAnalyticsEvent(eventName, params = {}) {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
}

// ----------------------------------------------------------------------------
// Role-based route map — used by every dashboard page to confirm a signed-in
// user is being sent to the correct console after authentication.
// Actual permission enforcement happens server-side via Firestore Security
// Rules (see /docs/firestore-data-model.md) — this map only governs client
// side redirects for UX, it is never treated as a trust boundary.
// ----------------------------------------------------------------------------
const ROLE_DASHBOARD_MAP = Object.freeze({
  super_admin: "dashboards/super-admin.html",
  teacher_in_charge: "dashboards/teacher-in-charge.html",
  core_team: "dashboards/core-team.html",
  logistics: "dashboards/logistics.html",
  volunteer: "dashboards/volunteer.html",
  event_head: "dashboards/event-head.html",
  role_head: "dashboards/role-head.html",
  school: "portal/school-portal.html",
});

/**
 * Looks up the current signed-in user's role document in Firestore
 * (collection: "users", keyed by uid) and resolves with the role string,
 * or null if no profile exists yet (e.g. auth account created but the
 * Super Admin has not yet provisioned a role document).
 * @param {import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js").User} user
 * @returns {Promise<string|null>}
 */
async function resolveUserRole(user) {
  if (!user) return null;
  const profileSnap = await getDoc(doc(db, "users", user.uid));
  if (!profileSnap.exists()) return null;
  return profileSnap.data().role ?? null;
}

export {
  app,
  auth,
  db,
  storage,
  logAnalyticsEvent,
  ROLE_DASHBOARD_MAP,
  resolveUserRole,
  // Re-exported Auth helpers
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  // Re-exported Firestore helpers
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
  // Re-exported Storage helpers
  storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
};