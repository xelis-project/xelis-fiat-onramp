const close_buttons = document.querySelector(`.box-bot-header svg`);

class BoxBot {
  constructor() {
    if (close_buttons) {
      close_buttons.addEventListener('click', (e) => {
        const box_bot = e.target.closest('.box-bot');
        this.close_box_bot(box_bot.id);
      });
    }
  }

  open_box_bot(id) {
    const box_bot = document.getElementById(id)
    box_bot.classList.add(`open`);
  }

  close_box_bot(id) {
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
