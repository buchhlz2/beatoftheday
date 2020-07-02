export default (artist_name) => {
  return `/artist/${ artist_name.replace(/\./g, 'ooo_dot_ooo') }`
}