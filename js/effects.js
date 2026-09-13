const EFFECTS = {
  none: {
    min: 0,
    max: 0,
    step: 0,
    filter: null,
    unit: ''
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'grayscale',
    unit: ''
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    filter: 'sepia',
    unit: ''
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    filter: 'invert',
    unit: '%'
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    filter: 'blur',
    unit: 'px'
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    filter: 'brightness',
    unit: ''
  },
};

const previewImage = document.querySelector('.img-upload__preview img');
const effects = document.querySelectorAll('.effects__radio');
const effectLevel = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectNone = document.querySelector('#effect-none');

let activeEffect = EFFECTS.none;

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

effectLevel.classList.add('hidden');

const applyEffect = (effect, value) => {
  if (effect.filter === null) {
    previewImage.style.removeProperty('filter');
    return;
  }

  previewImage.style.filter = `${effect.filter}(${value}${effect.unit})`;
};

effectLevelSlider.noUiSlider.on('update', (values) => {
  const value = Number(values[0]);

  effectLevelValue.value = value;

  applyEffect(activeEffect, value);
});

const onEffectChange = (evt) => {
  activeEffect = EFFECTS[evt.target.value];
  const effect = activeEffect;

  if (effect.filter === null) {
    effectLevel.classList.add('hidden');
    effectLevelValue.value = '';
    previewImage.style.removeProperty('filter');
    return;
  }

  effectLevel.classList.remove('hidden');

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
  });

  effectLevelValue.value = effect.max;
  applyEffect(effect, effect.max);
};

effects.forEach((effect) => {
  effect.addEventListener('change', onEffectChange);
});

const resetEffect = () => {
  effectNone.checked = true;
  activeEffect = EFFECTS.none;
  effectLevel.classList.add('hidden');
  effectLevelValue.value = '';
  previewImage.style.removeProperty('filter');

  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
};

export { resetEffect };
