// Menu mobile
const toggle = document.querySelector('.nav-toggle');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', open);
  document.body.classList.toggle('nav-open', open);
});
document.querySelectorAll('.site-nav a').forEach(a =>
  a.addEventListener('click', () => { toggle?.setAttribute('aria-expanded', 'false'); document.body.classList.remove('nav-open'); }));

// Formulário: em vez de e-mail, abre o WhatsApp com a mensagem pronta
document.querySelectorAll('form[data-wa]').forEach(form => form.addEventListener('submit', e => {
  e.preventDefault();
  const d = new FormData(form);
  const text = `Olá! Meu nome é ${d.get('nome')}.\nTenho interesse em: ${d.get('servico')}.\n\n${d.get('mensagem')}`;
  window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}));

// Abra o site com ?revisao para destacar o conteúdo provisório
if (new URLSearchParams(location.search).has('revisao')) document.documentElement.classList.add('revisao');
