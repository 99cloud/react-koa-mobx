/* eslint-disable consistent-return */
const cookie = (n, v) => {
  if (typeof v !== 'undefined') {
    window.document.cookie = [n, '=', encodeURIComponent(v)].join('')
  } else {
    v = window.document.cookie.match(new RegExp(`(?:\\s|^)${n}\\=([^;]*)`))
    return v ? decodeURIComponent(v[1]) : null
  }
}

export default cookie
