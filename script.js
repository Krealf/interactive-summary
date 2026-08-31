let currentCategory = document.querySelector('input[name="category"]:checked').value
let currentSearch = document.querySelector('#search').value

const toggleThemeButton = document.getElementById("btn-toggle-theme")
const inputsCategory = document.querySelectorAll('input[name="category"]')
const searchInput = document.querySelector("#search")
const skillsItems = document.querySelectorAll('.skills__item')
const html = document.documentElement

// Функция получения текущей темы из data-атрибута или предпочитаемой темы от браузера
const getTheme = () => {
    return html.getAttribute("data-theme") || (window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light")
}

// Функция установки темы в data-атрибут, в localstorage и изменение текста кнопки смены темы
const setTheme = (theme) => {
    html.setAttribute('data-theme', theme)
    localStorage.setItem("theme", theme)
    updateToggleText(theme)
}

// Функция смены текста у кнопки смены темы
const updateToggleText = (theme) => {
    const textButton = toggleThemeButton.querySelector('.toggle-text')
    textButton.textContent = theme === "dark" ? "Dark" : "Light"
    textButton.setAttribute("aria-label", `Переключить на ${theme === "dark" ? "светлую" : "тёмную"} тему`)
}

// При изменении предпочитаемой схемы от браузера и отсутствии в localstorage темы, происходит смена темы
window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : "light")
    }
})

// Функция фильтрации по категории и поиску
const filterAndSearch = () => {
    skillsItems.forEach((skill) => {
        const textSpan = skill.querySelector("span")

        if (skill.getAttribute('data-category') === currentCategory && textSpan.textContent.toLowerCase().includes(currentSearch.toLowerCase())) {
            skill.style.display = 'flex'
        } else if (currentCategory === 'all' && textSpan.textContent.toLowerCase().includes(currentSearch.toLowerCase())) {
            skill.style.display = 'flex'
        } else {
            skill.style.display = 'none'
        }
    })
}

// Обработчик на поле поиска
searchInput.addEventListener('input', (event) => {
    currentSearch = event.target.value
    filterAndSearch()
})

// Обработчики на поля input на смену категории
inputsCategory.forEach((input) => {
    input.addEventListener('change', (event) => {
        currentCategory = event.target.value
        filterAndSearch()
    })
})


// Смена текста у кнопки при инициализации
updateToggleText(getTheme())
