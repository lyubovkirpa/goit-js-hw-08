import throttle from 'lodash.throttle';

const filterForm = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

initForm();

const onFormInput = evt => {
  // console.log('name', evt.target.name);
  // console.log('value', evt.target.value);
  const { name, value } = evt.target;
  try {
    let saveData = load(LOCAL_STORAGE_KEY);
    saveData = saveData ? saveData : {};

    saveData[name] = value;

    save(LOCAL_STORAGE_KEY, saveData);
  } catch (error) {
    console.error(error);
  }
};

const throttleOnFormInput = throttle(onFormInput, 500);
filterForm.addEventListener('input', throttleOnFormInput);

function initForm() {
  const saveData = load(LOCAL_STORAGE_KEY);

  if (!saveData) {
    return;
  }
  Object.entries(parseData).forEach(([name, value]) => {
    filterForm.elements[name].value = value;
  });
}

const handleSubmit = evt => {
  evt.preventDefault();

  const {
    elements: { name, message },
  } = evt.currentTarget;

  console.log({ name: name.value, message: message.value });
  evt.currentTarget.reset();
  remove(LOCAL_STORAGE_KEY);
};

filterForm.addEventListener('submit', handleSubmit);
