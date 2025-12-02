// Демонстрационные данные новостей
const newsItems = [
  {
    date: '12.01.2025',
    title: 'Старт цикла постановки целей',
    description: 'Открыто окно для ввода и согласования целей. Используйте актуальные шаблоны.',
    cycle: '2025'
  },
  {
    date: '05.02.2025',
    title: 'Обновление методических материалов',
    description: 'Добавлены новые примеры формулировок и чек-листы для руководителей. Смотрите раздел «Материалы».',
    cycle: '2025'
  },
  {
    date: '15.07.2024',
    title: 'Промежуточная оценка завершена',
    description: 'Команды подвели итоги за первое полугодие, рекомендации отправлены руководителям.',
    cycle: '2024'
  },
  {
    date: '01.09.2024',
    title: 'Новый вебинар по согласованию целей',
    description: 'Запись и ответы на вопросы доступны в разделе «Материалы».',
    cycle: '2024'
  }
];

const navLinks = document.querySelectorAll('.nav-links a');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const newsList = document.getElementById('newsList');
const newsFilter = document.getElementById('newsFilter');
const faqButtons = document.querySelectorAll('.faq-question');
const feedbackForm = document.getElementById('feedbackForm');
const formStatus = document.getElementById('formStatus');

// Плавный скролл по меню
navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Бургер-меню для мобильных
burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(isOpen));
});

// Заполнение новостей
function renderNews(filter) {
  newsList.innerHTML = '';
  const filtered = newsItems.filter(item => filter === 'all' ? true : item.cycle === filter);

  filtered.forEach(item => {
    const newsEl = document.createElement('div');
    newsEl.className = 'news-item';
    newsEl.innerHTML = `
      <div class="news-date">${item.date} · цикл ${item.cycle}</div>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
    `;
    newsList.appendChild(newsEl);
  });

  if (filtered.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'news-date';
    empty.textContent = 'Новостей пока нет — загляните позже.';
    newsList.appendChild(empty);
  }
}

renderNews('all');

newsFilter.addEventListener('change', (event) => {
  renderNews(event.target.value);
});

// FAQ аккордеон
faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    const answer = button.nextElementSibling;
    button.setAttribute('aria-expanded', String(!expanded));
    answer.classList.toggle('open');
    answer.style.maxHeight = answer.classList.contains('open')
      ? `${answer.scrollHeight}px`
      : '0';
  });
});

// Форма обратной связи (демо)
feedbackForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = 'Спасибо! Ваше сообщение отправлено (демо).';
  feedbackForm.reset();
});

// Подсказки по ссылкам (оставлены заглушки)
// Регламент и методические материалы: замените href="#" на реальные URL PDF.
// Раздел «Материалы»: у каждой кнопки «Открыть»/«Скачать» подставьте ссылки на презентации, записи или файлы.
// Новости: дополняйте newsItems новыми объектами { date, title, description, cycle } по мере появления информации.
