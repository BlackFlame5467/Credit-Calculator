const formContainers = document.querySelectorAll('.form__slider-container')

const sliders = document.querySelectorAll('.form__slider')
const sliderCount = document.querySelector('#slider__count')
const sliderDays = document.querySelector('#slider__days')

const inputs = document.querySelectorAll('.form__slider-input')
const inputCount = document.querySelector('#input__count')
const inputDays = document.querySelector('#input__days')

const totalPrice = document.querySelector('#credit__total-count')
const totalDailyPrice = document.querySelector('#credit__daily-count')

const btn = document.querySelector('.btn')

for (const [index, slider] of sliders.entries()) {
	slider.addEventListener('input', () => {
		assignValue()

		formContainers[index].classList.remove('form__slider-container--error')
		changeRangeColor(slider)
		btn.disabled = false
	})
}

const calcCredit = () => {
	const daily =
		(+inputCount.value + inputCount.value * (2.2 / 100) * inputDays.value) /
		inputDays.value
	totalDailyPrice.innerHTML = `${Math.round(daily)} грн.`
	totalPrice.innerHTML = `${Math.round(daily * inputDays.value)} грн.`
}

btn.addEventListener('click', () => {
	calcCredit()
})

function assignValue() {
	inputCount.value = sliderCount.value
	inputDays.value = sliderDays.value
}

inputs.forEach((input, index) => {
	input.addEventListener('focusin', () => {
		formContainers[index].classList.remove('form__slider-container--error')
	})
	input.addEventListener('focusout', () => {
		if (
			+input.value > +input.nextElementSibling.max ||
			+input.value < +input.nextElementSibling.min
		) {
			formContainers[index].classList.add('form__slider-container--error')
			input.nextElementSibling.value = '0'
			changeRangeColor(input.nextElementSibling)
			btn.disabled = true
		} else {
			input.nextElementSibling.value = input.value
			changeRangeColor(input.nextElementSibling)
			btn.disabled = false
		}
	})
})

sliders.forEach(slider => {
	slider.addEventListener('input', () => {
		const value =
			((slider.value - slider.min) / (slider.max - slider.min)) * 100
		slider.style.background = `linear-gradient(to right, #76c7c0 0%, #76c7c0 ${value}%, #ddd ${value}%, #ddd 100%)`
	})
})

function changeRangeColor(slider = null) {
	const value = ((slider.value - slider.min) / (slider.max - slider.min)) * 100
	slider.style.background = `linear-gradient(to right, #76c7c0 0%, #76c7c0 ${value}%, #ddd ${value}%, #ddd 100%)`
}

assignValue()
