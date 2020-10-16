export default function login(that, jwt) {
  localStorage.setItem(
    that.$global.JWT_NAME_ANONYMOUS,
    localStorage.getItem(that.$global.JWT_NAME)
  )
  localStorage.setItem(that.$global.JWT_NAME, jwt)
  that.$router.push(that.form.username)
  location.reload() // Invalidate cached components.
}
