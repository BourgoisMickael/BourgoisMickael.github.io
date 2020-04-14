function selectTheme(obj) {
  const link = `https://registry.jsonresume.org/BourgoisMickael?theme=${obj.text}`

  const linkElem = document.getElementById('jsonResume')
  linkElem.setAttribute('href', link)
  linkElem.textContent = link

  const resumeElem = document.getElementById('resumeFrame')
  resumeElem.setAttribute('src', link)
}
