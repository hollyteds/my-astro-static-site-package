export default class SmoothScroll {

  public static init() {
    window.addEventListener('load', () => {
      this.setEvent();
      this.scrollOnLoad();
    });
  }

  /**
   * パスにアンカーが存在する場合に、ヘッダー分のずれ補正のため、ページロード時にアンカーまでスクロールする。
   */
  private static scrollOnLoad () {
    const id = this.getHash(location.hash);
    if (!id) return;
  
    this.scrollToAnchor(id, 'auto');
    
  }
  
  /**
   * URL文字列から#を除いたハッシュ値を取り出します。
   * @param urlString - ハッシュ値を抽出するURL文字列。
   * @returns 先頭の'#'文字を除いたハッシュ値、あるいは入力がNULLの場合は空の文字列を返す。
   */
  private static getHash (urlString: string | null) : string {
    if (!urlString) return "";

    const hashIndex :number = urlString.indexOf("#");
    if (hashIndex < 0) return "";

    const fragment = urlString.substring(hashIndex);
    const id = fragment.split('?')[0];
    return id.substring(1);1
  }

  /**
   * 指定されたIDのアンカーにウィンドウをスクロールします。
   * @param id - スクロール先のアンカー要素のID.
   */
  private static scrollToAnchor (id : string, behavior : 'smooth' | 'instant' | 'auto' = 'smooth' ) : void {
    const target = document.getElementById(id);
    if (!target) return;

    const screenWidth :number = window.innerWidth;
    const targetElement: HTMLElement | null = screenWidth >= 1024
      ? document.getElementById('nav') : document.getElementById('header');
  
    const headerHeight: number = targetElement ? targetElement.offsetHeight : 0;
    const position: number = target.offsetTop - headerHeight;

    scrollTo({
      top: position < 0 ? 0 : position,
      behavior: behavior
    });
  };


  /**
   * アンカーリンクのスムーズスクロールイベントをセットします
   */
  private static setEvent() : void {
    const anchorLinks : NodeListOf<Element> = document.querySelectorAll('a[href*="#"]');
    anchorLinks.forEach((link : Element)=> {
      if (!this.isEqualPage(link)) return;
      link.addEventListener('click', event => {
        event.preventDefault();
        const id : string = this.getHash(link.getAttribute('href'));
        if (id) this.scrollToAnchor(id);
      });
    });

  };
  
  /**
   * 与えられた要素のhref属性の値が現在のページと同じページを指しているかどうかをチェックします。
   * @param element - チェックする要素
   * @returns 要素が同じページを指しているかどうかを示すブール値
   */
  private static isEqualPage(element: Element): boolean | undefined {
    const href: string | null = element.getAttribute('href');
    if (!href) return;
    const linkUrl: URL = new URL(href, location.href);
    const currentUrl: URL = new URL(location.href);

    // パラメータとハッシュを除去して比較
    return linkUrl.pathname === currentUrl.pathname;
  }
  
}
