/**
 * ヘッダーを可変させるためのクラスオブジェクト
 */

export default class ScrollObserver {

  /**
   * @param {*} observedElement 
   * 監視する対象の要素、l-scrollObserverなど
   * @param {*} className  (option)
   * イベントを検知した時にルート要素に追加するクラス名
   * @param {*} observerOptions (option)
   * 交差オブザーバーの設定
   */

  private className: string;
  private targetClassList: DOMTokenList;
  private observedElement: Element;
  private observerOptions: IntersectionObserverInit;
  private observer: IntersectionObserver;

  constructor(observedElement: Element, className = 'is-scrolled', observerOptions?: IntersectionObserverInit) {
    this.className = className;
    this.targetClassList = document.documentElement.classList;
    this.observedElement = observedElement;
    this.observerOptions = {
      ...{
        root: null,
        rootMargin: '0px',
        threshold: 0
      },
      ...observerOptions
    };
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          this.setClassName();
        } else {
          this.removeClassName();
        }
      });
    }, this.observerOptions);

    this.init();
  }

  private init() {
    this.observer.observe(this.observedElement);
  }

  /**
   * ルート要素にクラス名をセット
   */
  private setClassName() {
    this.targetClassList.add(this.className);
  }

  /**
   * ルート要素からクラス名を除去
   */
  private removeClassName() {
    this.targetClassList.remove(this.className);
  }
}