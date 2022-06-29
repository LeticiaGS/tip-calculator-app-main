const btnsTipsEl = Array.from(document.querySelectorAll('.btn'))
const inputBillEl = document.getElementById('bill-input')
const inputNumPeopleEl = document.getElementById('division-input')
const tipAmountEl = document.getElementById('amount-tip')
const totalEl = document.getElementById('total')
const contentDivisionEl = document.querySelector('.division-content')
const contentBillEl = document.querySelector('.bill-content')
const btnResetEl = document.getElementById('resetBtn')
const inputCustomEl = document.querySelector('.custom')
let valueTip = ''

btnsTipsEl.forEach(btn => {
  btn.addEventListener('click', onItemClick)
})

inputNumPeopleEl.addEventListener('keyup', tipCalculator)
inputBillEl.addEventListener('keyup', tipCalculator)
inputCustomEl.addEventListener('keyup', () => {
  if (inputCustomEl.value.match(/^[0-9]*$/)) {
    valueTip = inputCustomEl.value
    tipCalculator()
  }
})
btnResetEl.addEventListener('click', resetSplitter)

function activeButton(e) {
  if (!e.target.classList.value.includes('active')) {
    btnsTipsEl.forEach(btn => {
      btn.classList.value.includes('active')
        ? btn.classList.remove('active')
        : ''
    })
  }
  e.target.classList.toggle('active')
}

function onItemClick(e) {
  activeButton(e)
  tipCalculator()
}

function tipCalculator() {
  btnsTipsEl.forEach(btn => {
    if (btn.classList.value.includes('active')) {
      valueTip = btn.value
    }
  })
  if (valueTip != '') {
    const valueBill = inputBillEl.value.trim()
    const valueNumPeople = inputNumPeopleEl.value.trim()
    if (valueBill != '') {
      if (valueNumPeople != '') {
        if (valueNumPeople == 0 || valueBill == 0) {
          if (valueNumPeople == 0) {
            contentDivisionEl.classList.add('alert')
          } else [contentDivisionEl.classList.remove('alert')]

          if (valueBill == 0) {
            contentBillEl.classList.add('alert')
          } else [contentBillEl.classList.remove('alert')]
          return
        }
        totalPerPerson(valueBill, valueNumPeople, valueTip)
        tipPerPerson(valueBill, valueNumPeople, valueTip)
      } else {
        resetRsults()
      }
    } else {
      resetRsults()
    }
  } else {
    resetRsults()
  }
}

function tipPerPerson(bill, numPeople, tip) {
  const porcent = tip / 100
  const amountTip = ((porcent * bill) / numPeople).toFixed(2)
  tipAmountEl.textContent = `$${amountTip}`

  btnResetEl.classList.add('active')
}

function totalPerPerson(bill, numPeople, tip) {
  const porcent = tip / 100
  const amountTip = (porcent * bill) / numPeople
  const total = (bill / numPeople + amountTip).toFixed(2)
  totalEl.textContent = `$${total}`
}

function resetSplitter(e) {
  if (e.target.classList.value.includes('active')) {
    e.target.classList.remove('active')
    inputBillEl.value = ''
    inputNumPeopleEl.value = ''
    resetRsults()

    btnsTipsEl.forEach(btn => {
      btn.classList.value.includes('active')
        ? btn.classList.remove('active')
        : ''
    })
  }
}

function resetRsults() {
  tipAmountEl.textContent = `$0.00`
  totalEl.textContent = `$0.00`
}
