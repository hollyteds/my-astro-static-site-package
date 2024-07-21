type elem = HTMLElement | null;
type action = "on" | "off";

export default class SetMenuButton {
  private buttonElement: elem = null;
  private flagTarget: elem = null;;
  private NavElement: elem = null;;

  constructor() {
    
    document.addEventListener("DOMContentLoaded", () => {
      this.buttonElement = document.querySelector('[data-menu-button]');
      this.flagTarget = document.querySelector('[data-menu-button-target]');
      this.NavElement = document.querySelector('[data-menu-button-nav]');

      if (!this.buttonElement
        || !this.flagTarget
        || !this.NavElement
      ) return;

      this.init();
    });
  }

  public init() {
    this.setEvent();
    this.setEventDefaultAction();
    // this.observeDeviceType();
  }

  private setEvent() {
    this.buttonElement?.addEventListener('click', () => {
      this.toggleAction();
    });
  }

  // private getEventType() {
  //   const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  //   console.log(isTouchDevice)
  //   return 'click'; //isTouchDevice ? 'touchend' : 'click';
  // }

  private toggleAction() {
    if (this.checkFlagState()) {
      this.setDefault();
    } else {
      this.setStateOpen();
    }
  }

  private setEventDefaultAction() {
    if (!this.NavElement) return;
    const menuElements: NodeListOf<Element> = this.NavElement.querySelectorAll('a[href]');
    if (menuElements.length < 1) return;
    menuElements.forEach((elem: Element) => {
      elem.addEventListener('click', () => {
        this.setDefault();
      })
      elem.addEventListener('focus', () => {
        this.setStateOpen();
      })
      elem.addEventListener('focusout', () => {
        this.setDefault();
      })
    });
  }

  private setStateOpen() {
    this.changeFlag('on');
    this.changeButtonState('on');
    this.changeNavState('on');
  }

  private setDefault() {
    this.changeFlag('off');
    this.changeButtonState('off');
    this.changeNavState('off');
  }

  private changeFlag( action : action ) {
    if (!this.flagTarget) return;
    this.flagTarget.dataset.menuOpen = action === "on" ? "true" : "false";
  }

  private changeButtonState( action : action ) {
    if (!this.buttonElement) return;
    this.buttonElement.dataset.buttonState = action === "on" ? "on" : "off";
  }

  private changeNavState( action : action ) {
    if (!this.NavElement) return false;
    return this.NavElement.dataset.navOpen = action === "on" ? "true" : "false";
  }

  private checkFlagState() {
    if (!this.flagTarget) return false;
    return this.flagTarget.dataset.menuOpen === "true"
  }

  // private observeDeviceType() {

  //   const touchDeviceQuery = window.matchMedia('(pointer: coarse)');

  //   const handleDeviceChange = (e: any) => {
  //     if (e.matches) {
  //       console.log('This is a touch device');
  //       this.buttonElement.removeEventListener('click', () => {
  //         this.toggleAction();
  //       });
  //     } else {
  //       console.log('This is not a touch device');
  //       this.buttonElement.removeEventListener('touchstart', () => {
  //         this.toggleAction();
  //       });
  //     }
  //     // this.setEvent();

  //   };

  //   // メディアクエリの状態を監視
  //   touchDeviceQuery.addListener(handleDeviceChange);

  //   // 初期状態のメディアクエリの状態をチェック
  //   handleDeviceChange(touchDeviceQuery);
  // }
    
}
