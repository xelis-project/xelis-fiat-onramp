const close_buttons = document.querySelectorAll(`.box-bot-header svg`);

class BoxBot {
  constructor() {
    if (close_buttons) {
      close_buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const box_bot = e.target.closest('.box-bot');
          this.close(box_bot.id);
        });
      })
    }
  }

  open(id) {
    const box_bot = document.getElementById(id)
    box_bot.classList.add(`open`);
  }

  close(id) {
    const box_bot = document.getElementById(id)
    if (!box_bot.classList.contains("open")) return;

    box_bot.classList.remove(`open`);
    box_bot.classList.add(`close`);
    setTimeout(() => {
      box_bot.classList.remove(`close`);
    }, 250);
  }
}

const box_bot = new BoxBot();
