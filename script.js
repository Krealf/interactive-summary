const toggleThemeButton = document.getElementById("btn-toggle-theme")
const html = document.documentElement

const getTheme = () => {
    return html.getAttribute("data-theme") || (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")
}

const setTheme = (theme) => {
    html.setAttribute('data-theme', theme)
    localStorage.setItem("theme", theme)
    updateToggleText(theme)
}

const updateToggleText = (theme) => {
    const textButton = toggleThemeButton.querySelector('.toggle-text')
    textButton.textContent = theme === "dark" ? "Dark" : "Light"
    textButton.setAttribute("aria-label", `Переключить на ${theme === "dark" ? "светлую" : "тёмную"} тему`)
}

updateToggleText(getTheme())

toggleThemeButton.addEventListener('click', () => {
    const current = getTheme();
    setTheme(current === "dark" ? "light" : "dark")
})

window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : "light")
    }
})