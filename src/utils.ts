export const extractDraftId = (url?: string) => {
  if (!url) {
    return ''
  }
  return url.replace(/https:\/\/aoe2cm\.net\/(draft|spectate)\//, '').replace(/\/$/, '')
}
