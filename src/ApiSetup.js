/* eslint-disable no-var */
// This directive tells Apps Script not to ask the player for permissions to all their google sheets.
// Leave it here.
/**
 * @OnlyCurrentDoc
 */

// Must match the name of your project (your library) and cannot contain spaces.
const CLIENT_NAME = 'GrootApi';
const CLIENT_SCOPES = ['m3p.f.pr.pro', 'm3p.f.pr.ros', 'm3p.f.pr.inv', 'm3p.f.ar.pro', 'offline'];
const CLIENT_ID = 'f107a887-b23d-46bd-9012-53f857645a58';
const CLIENT_SECRET = PropertiesService.getScriptProperties().getProperty('CLIENT_SECRET');
// B = TokenBook Logs, C = Connection Logs, H = Handled Exception Logs
const OVERRIDE_DEBUG_LOGS = 'BCH';
const API_KEY = '17wMKJLRxy3pYDCKG5ciP7VSU45OVumB2biCzzgw'; // As defined in https://developer.marvelstrikeforce.com/beta/index.html
const AUTH_URL = 'https://hydra-public.prod.m3.scopelypv.com/oauth2/token';
const API_BASE = 'https://api.marvelstrikeforce.com';

// Initialize the MSF API.
var ss = SpreadsheetApp.getActiveSpreadsheet();
var MSF = init();

// IMPORTANT: This line exposes the function to handle the OAuth callback. Don't change it.
var EnrollASheetCallback = MSF.EnrollASheetCallback;

// RECOMMENDED: This exposes functions to let the player logout without having to delete their sheet.
var forgetLogin = MSF.forgetLogin;
var debugForgetAccessToken = MSF.debugForgetAccessToken;

// DISCOURAGED: Exposing this function makes it possible for others to make calls under your client secret.
// var callApi = MSF.callApi; // better NOT to do this; instead only use MSF.callApi from your library project.
function init() {
  const privacy = 'Privacy';
  let hidden = false;

  if (isHidden(privacy) === true) {
    hidden = true;
    showSheet(privacy);
  }

  const MSF = EnrollASheet.init({ CLIENT_NAME, CLIENT_SCOPES, CLIENT_ID, CLIENT_SECRET, OVERRIDE_DEBUG_LOGS });

  if (hidden === true) hideSheet(privacy);

  return MSF;
}
