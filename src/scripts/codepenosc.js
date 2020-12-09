class Oscilloscope {
    constructor(synth, element) {
      this.synth = synth
      this.element = element
      const style = this.element.shadowRoot.querySelector('style')
      style.textContent = style.textContent.replace('#aaa', 'transparent')
      this.element.bind(this.synth)
    }
  }
  
  class Pad {
    constructor(synth, element) {
      this.down = touchable(this.down.bind(this))
      this.move = touchable(this.move.bind(this))
      this.up = touchable(this.up.bind(this))
      this.transitionTimeout = null
      
      this.parameters = {
        'modulationIndex.value': [0, 100],
        'harmonicity.value': [0, 1],
        'frequency.value': [0, 880],
        'modulation.frequency.value': [0, 880],
        'modulation.partialCount': [1, 32, true],
        'oscillator.partialCount': [1, 32, true],
        'envelope.attack': [0, 20],
        'envelope.decay': [0, 20],
        'envelope.sustain': [0, 20],
        'envelope.release': [0, 20],
        'modulationEnvelope.attack': [0, 20],
        'modulationEnvelope.decay': [0, 20],
        'modulationEnvelope.sustain': [0, 20],
        'modulationEnvelope.release': [0, 20]
      }
      
      this.synth = synth
      this.element = element
      this.cursor = this.element.querySelector('.pad__cursor')
      this.xSelect = this.element.querySelector('.pad__select--x')
      this.ySelect = this.element.querySelector('.pad__select--y')
      this.synthSelect = this.element.querySelector('.pad__select--synth')
      this.modulationSelect = this.element.querySelector('.pad__select--modulation')
      this.lockedAxis = false
      this.origin = { x: 0, y: 0, pointer: { x: 0, y: 0 }, cursor: { left: 0, top: 0 } }
      this.x = 0.5
      this.y = 0.5
      
      ;[this.xParameter, this.yParameter] = Object.keys(this.parameters)
      
      ;[this.xSelect, this.ySelect].forEach((select, selectIndex) => {
        Object.keys(this.parameters).forEach((parameter, parameterIndex) => {
          const option = document.createElement('option')
          option.value = parameter
          option.selected = selectIndex === parameterIndex
          option.textContent = parameter
            .replace(/\.value$/, '')
            .replace('.', ' ')
            .replace(/([^A-Z])([A-Z]+)/, '$1 $2')
            .toLowerCase()
          
          select.appendChild(option)
        })
      })
      
      this.synth.voices.forEach((voice) => {
        voice.oscillator.baseType = this.synthSelect.value
      })
      
      this.synth.voices.forEach((voice) => {
        voice.modulation.baseType = this.modulationSelect.value
      })
      
      this.element.querySelectorAll('.pad__options').forEach((options) => {
        options.addEventListener(touchable.down, event => event.stopPropagation())
      })
      
      this.xSelect.addEventListener('change', () => {
        this.transition(() => {
          this.x = this.get(this.xParameter = this.xSelect.value)
        })
      })
      
      this.ySelect.addEventListener('change', () => {
        this.transition(() => {
          this.y = this.get(this.yParameter = this.ySelect.value)
        })
      })
      
      this.synthSelect.addEventListener('change', () => {
        this.synth.voices.forEach((voice) => {
          voice.oscillator.baseType = this.synthSelect.value
        })
      })
      
      this.modulationSelect.addEventListener('change', () => {
        this.synth.voices.forEach((voice) => {
          voice.modulation.baseType = this.modulationSelect.value
        })
      })
      
      this.element.addEventListener(touchable.down, () => {
        this.update()
      }, { once: true })
      
      this.element.addEventListener(touchable.down, this.down)
      
      addEventListener('keydown', (event) => {
        if (event.shiftKey) this.lockedAxis = true
      })
      
      addEventListener('keyup', () => {
        this.lockedAxis = false
      })
    }
    
    get width() {
      return this.element.offsetWidth
    }
    
    get height() {
      return this.element.offsetHeight
    }
    
    get x() {
      return this.left / this.width
    }
    
    set x(v) {
      this.left = v * this.width
    }
    
    get y() {
      return this.top / this.height
    }
    
    set y(v) {
      this.top = v * this.height
    }
    
    get top() {
      return parseFloat(this.cursor.style.top)
    }
    
    set top(v) {
      this.cursor.style.top = Math.max(0, Math.min(this.height, v))  + 'px'
    }
    
    get left() {
      return parseFloat(this.cursor.style.left)
    }
    
    set left(v) {
      this.cursor.style.left = Math.max(0, Math.min(this.width, v))  + 'px'
    }
    
    transition(callback) {
      this.cursor.classList.add('pad__cursor--transition')
      setTimeout(() => {
        callback()
        clearTimeout(this.transitionTimeout)
        this.transitionTimeout = setTimeout(() => {
          this.cursor.classList.remove('pad__cursor--transition')
        }, Math.max(...getComputedStyle(this.cursor).transitionDuration.split(',').map(parseFloat))*1000)
      }, 1)
    }
      
    get(parameter) {
      const [minimum, maximum] = this.parameters[parameter]
      return (parameter.split('.').reduce((target, key) => target[key], this.synth.voices[0]) - minimum)/(maximum - minimum)
    }
    
    set(parameter, value) {
      const [minimum, maximum, integer] = this.parameters[parameter]
      const keys = parameter.split('.')
      const last = keys.pop()
      value = value * (maximum - minimum) + minimum
      if (integer) value = ~~value
      this.synth.voices.forEach((voice) => {
        keys.reduce((target, key) => target[key], voice)[last] = value
      })
    }
    
    update() {
      this.set(this.xParameter, this.x)
      this.set(this.yParameter, this.y)
    }
    
    down(event) {
      event.preventDefault()
      
      if (event.target !== this.cursor) {
        this.top = event.clientY - this.element.offsetTop
        this.left = event.clientX - this.element.offsetLeft
        this.update()
      }
      
      document.body.setAttribute('data-dragging', true)
      this.cursor.classList.add('pad__cursor--active')
      
      this.origin.pointer.x = event.clientX
      this.origin.pointer.y = event.clientY
      this.origin.cursor.left = this.left
      this.origin.cursor.top = this.top
      this.origin.x = event.clientX - this.left
      this.origin.y = event.clientY - this.top
      
      addEventListener(touchable.move, this.move)
      addEventListener(touchable.up, this.up)
    }
    
    move(event) {
      event.preventDefault()
      
      console.log(this.lockedAxis)
      
      if (this.lockedAxis === true) {
        const deltaX = Math.abs(event.clientX - this.origin.pointer.x)
        const deltaY = Math.abs(event.clientY - this.origin.pointer.y)
        
        if (deltaX > 5 || deltaY > 5) {
          if (deltaX > deltaY) {
            this.lockedAxis = 'x'
            this.top = this.origin.cursor.top
          } else {
            this.lockedAxis = 'y'
            this.left = this.origin.cursor.left
          }
        }
      }
  
      if (this.lockedAxis !== 'y') this.left = event.clientX - this.origin.x
      if (this.lockedAxis !== 'x') this.top = event.clientY - this.origin.y
      
      this.update()
    }
    
    up() {
      document.body.removeAttribute('data-dragging')
      this.cursor.classList.remove('pad__cursor--active')
      
      removeEventListener(touchable.move, this.move)
      removeEventListener(touchable.up, this.up)
    }
  }
  
  class Keyboard {
    constructor(synth) {
      this.handle = this.handle.bind(this)
      this.synth = synth
    }
    
    async initialize() {
      if (!navigator.requestMIDIAccess) return
      
      const access = await navigator.requestMIDIAccess()
      this.input = access.inputs.values().next().value
      
      console.log(this.input)
      
      if (this.input) this.input.onmidimessage = this.handle
    }
    
    handle(event) {
      let [_, note, velocity] = event.data
      note = Tone.Frequency.mtof(note)
      if (!velocity) this.synth.triggerRelease(note)
      else this.synth.triggerAttack(note, undefined, velocity/100)
    }
  }
  
  function touchable(listener) {
    if (window.orientation === undefined) return listener
    
    return (event) => {
      const { pageX, pageY } = event.changedTouches[0]
      listener(Object.assign(event, { clientX: pageX, clientY: pageY }))
    }
  }
  
  touchable.down = window.orientation === undefined ? 'mousedown' : 'touchstart'
  touchable.move = window.orientation === undefined ? 'mousemove' : 'touchmove'
  touchable.up = window.orientation === undefined ? 'mouseup' : 'touchend'
  
  const synth = new Tone.PolySynth(10, Tone.FMSynth)
  const pad = new Pad(synth, document.querySelector('.pad'))
  const oscilloscope = new Oscilloscope(synth, document.querySelector('tone-oscilloscope'))
  const keyboard = new Keyboard(synth)
  
  addEventListener(touchable.down, () => {
    synth.toMaster()
    synth.triggerAttack('A4')
    keyboard.initialize()
  }, { once: true })