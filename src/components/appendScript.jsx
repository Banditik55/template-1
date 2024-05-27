const appendScript = (url) => {
  const script = document.createElement("script")
  script.src = url
  script.async = true
  document.body.appendChild(script)
  const remove = (script) => {
    document.body.removeChild(script)
  }
  return { script, remove }
}

export default appendScript
