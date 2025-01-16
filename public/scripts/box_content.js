const div_box_content = document.getElementById('box_content');
const div_box_content_top = document.getElementById('box_content_top');
const div_box_content_bot = document.getElementById('box_content_bot');

class BoxContent {
  constructor() {
    div_box_content.addEventListener('scroll', (e) => {
      this.check_box_content_edge();
    });

    this.check_box_content_edge();
  }

  check_box_content_edge() {
    if (div_box_content.scrollTop === 0) {
      div_box_content_top.style.display = `none`;
    } else {
      div_box_content_top.style.display = `block`;
    }

    const end = div_box_content.scrollHeight - div_box_content.offsetHeight;
    if (div_box_content.scrollTop + 1 >= end) {
      div_box_content_bot.style.display = `none`;
    } else {
      div_box_content_bot.style.display = `block`;
    }

    // console.log(div_box_content.scrollHeight, div_box_content.scrollTop, div_box_content.offsetHeight, div_box_content.clientHeight);
  }
}

const box_content = new BoxContent();
