class ToggleSampleListClass {
  constructor(toggleBtnClassName) {
    this.list = document.getElementById('sample-list');
    this.listItem = this.list.querySelector('ul');
    this.toggleBtns = document.getElementsByClassName(toggleBtnClassName);
  }

  init() {
    this.toggleHandler();
  }

  toggleHandler() {
    const self = this;
    [...this.toggleBtns].forEach(btn => {
      btn.addEventListener('click', this.toggle.bind(self));
    });
  }

  toggle() {
    const listActive = this.list.classList.contains('is-active');
    if (listActive) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    const self = this;
    const tl = gsap.timeline();
    tl.set(this.listItem.children, {
      x: -20,
      autoAlpha: 0,
    }).set(this.list, {
      display: 'block',
      y: 20,
      autoAlpha: 0,
    }).to(this.list, {
      y: 0,
      autoAlpha: 1,
    }).to(this.listItem.children, {
      x: 0,
      autoAlpha: 1,
      stagger: {
        each: .1,
      },
      onComplete() {
        self.list.classList.add('is-active');
      },
    }, '+=1');
  }

  hide() {
    const self = this;
    const tl = gsap.timeline();
    tl.to(this.listItem.children, {
      x: 20,
      autoAlpha: 0,
      stagger: {
        each: .1,
        from: 'end',
      },
    }).to(this.list, {
      y: -20,
      autoAlpha: 0,
    }, '+=1').set([this.list, this.listItem.children], {
      clearProps: 'all',
      onComplete() {
        self.list.classList.remove('is-active');
      }
    });
  }
}

const toggleSampleList = new ToggleSampleListClass('js-toggle-sample-list');
toggleSampleList.init();
