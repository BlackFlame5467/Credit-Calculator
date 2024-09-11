const formContainers = document.querySelectorAll('.form__slider-container')

const formTitles = document.querySelectorAll('.form__slider-title')

const sliders = document.querySelectorAll('.form__slider')
const sliderCount = document.querySelector('#slider__count')
const sliderDays = document.querySelector('#slider__days')

const inputs = document.querySelectorAll('.form__slider-input')
const inputCount = document.querySelector('#input__count')
const inputDays = document.querySelector('#input__days')

const totalPrice = document.querySelector('#credit__total-count')
const totalDailyPrice = document.querySelector('#credit__daily-count')

const btn = document.querySelector('.btn')

const updateValues = () => {
	inputCount.value = sliderCount.value
	inputDays.value = sliderDays.value
	calcCredit()
}

const handleInputChange = (input, slider) => {
	let value = input.value
	if (
		+input.value > +input.nextElementSibling.max ||
		+input.value < +input.nextElementSibling.min
	) {
		btn.disabled = true
	} else {
		btn.disabled = false
		calcCredit()
	}

	input.value = value
	slider.value = value
	updateSliderColor(slider)
}

const calcCredit = () => {
	const daily =
		(+inputCount.value + inputCount.value * (2.2 / 100) * inputDays.value) /
		inputDays.value
	totalDailyPrice.innerHTML = `${daily.toFixed(2)} грн.`
	totalPrice.innerHTML = `${(daily * inputDays.value).toFixed(2)} грн.`
}

const updateSliderColor = slider => {
	const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100
	slider.style.background = `linear-gradient(to right, #76c7c0 0%, #76c7c0 ${value}%, #ddd ${value}%, #ddd 100%)`
}

sliders.forEach((slider, index) => {
	slider.addEventListener('input', () => {
		updateValues()
		updateSliderColor(slider)
		formContainers[index].classList.remove('form__slider-container--error')
	})
})

inputs.forEach((input, index) => {
	let inputTitle = formTitles[index].innerHTML
	input.addEventListener('input', () => {
		handleInputChange(input, sliders[index])
	})
	input.addEventListener('focusin', () => {
		formContainers[index].classList.remove('form__slider-container--error')
		formTitles[index].innerHTML = inputTitle
	})
	input.addEventListener('focusout', () => {
		if (
			+input.value > +input.nextElementSibling.max ||
			+input.value < +input.nextElementSibling.min
		) {
			formContainers[index].classList.add('form__slider-container--error')
			formTitles[index].innerHTML = 'Введені неправильні дані'
			updateSliderColor(input.nextElementSibling)
			btn.disabled = true
		} else {
			input.nextElementSibling.value = input.value
			updateSliderColor(input.nextElementSibling)
			btn.disabled = false
		}
	})
})

updateValues()
sliders.forEach(slider => {
	updateSliderColor(slider)
})
