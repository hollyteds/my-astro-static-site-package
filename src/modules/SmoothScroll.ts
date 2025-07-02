/**
 * SmoothScroll.ts
 * スムーズスクロールを実装するクラス
 * ページ内のアンカーリンクをクリックした際に、スムーズにスクロールします。
 * また、ページロード時にハッシュが存在する場合は、そのアンカーまでスクロールします。
 */
export default class SmoothScroll {

  /**
   * スクロール前に呼び出すコールバック関数
   */
  private addAction: ((target: HTMLElement) => void) | null = null;

  /**
   * 固定ヘッダーの要素（高さを考慮する）
   */
  private header: HTMLElement | null = null;

  /**
   * コンストラクタ
   * @param options - オプション設定オブジェクト
   * @param options.addAction - スクロール完了後に呼び出す関数
   * @param options.headerElement - 固定ヘッダー要素
   */
  constructor(options?: {
    addAction?: (target: HTMLElement) => void,
    headerElement?: HTMLElement | null
  }) {
    this.addAction = options?.addAction || null;
    this.header = options?.headerElement || null;
    this.init();
  }

  /**
   * 初期化処理を実行する（イベント登録、ロード時スクロール）
   */
  private init(): void {
    this.setEvent();
    this.scrollOnLoad();
  }

  /**
   * ページロード時にURLのハッシュにスクロールする
   */
  private scrollOnLoad(): void {
    const id = this.getHash(location.hash);
    if (!id) return;

    this.scrollToAnchor(id, 'auto');
  }

  /**
   * スクロール位置を計算する
   * @param target - スクロール先の要素
   * @returns 計算済みのスクロール位置（ピクセル）
   */
  private getScrollPosition(target: HTMLElement): number {
    let position = 0;
    let element: HTMLElement | null = target;
    while (element) {
      position += element.offsetTop;
      element = element.offsetParent as HTMLElement | null;
    }
    const headerHeight = this.header ? this.header.offsetHeight : 0;
    return Math.max(0, position - headerHeight);
  }

  /**
   * 指定されたIDのアンカーにウィンドウをスクロールします。
   * @param id - スクロール先のアンカー要素のID
   * @param behavior - スクロールアニメーションの種類（'smooth' | 'instant' | 'auto'）
   */
  private scrollToAnchor(id: string, behavior: 'smooth' | 'instant' | 'auto' = 'smooth'): void {
    const target = document.getElementById(id);
    if (!target) return;

    const position = this.getScrollPosition(target);

    // コールバック関数を実行
    if (this.addAction && typeof this.addAction === 'function') {
      this.addAction(target);
    }

    scrollTo({
      top: position,
      behavior: behavior
    });
  }

  /**
   * アンカーリンクのスムーズスクロールイベントをセットします
   */
  private setEvent(): void {
    const anchorLinks: NodeListOf<Element> = document.querySelectorAll('a[href*="#"]');
    anchorLinks.forEach((link: Element) => {
      if (!this.isEqualPage(link)) return;
      link.addEventListener('click', event => {
        event.preventDefault();
        const id: string = this.getHash(link.getAttribute('href'));
        if (id) this.scrollToAnchor(id);
      });
    });
  }

  /**
   * 与えられた要素のhref属性の値が現在のページと同じページを指しているかどうかをチェックします。
   * @param element - チェックする要素
   * @returns 要素が同じページを指しているかどうかを示すブール値
   */
  private isEqualPage(element: Element): boolean | undefined {
    const href: string | null = element.getAttribute('href');
    if (!href) return;
    const linkUrl: URL = new URL(href, location.href);
    const currentUrl: URL = new URL(location.href);

    // パラメータとハッシュを除去して比較
    return linkUrl.pathname === currentUrl.pathname;
  }

  /**
   * URL文字列から#を除いたハッシュ値を取り出します。
   * @param urlString - ハッシュ値を抽出するURL文字列。
   * @returns 先頭の'#'文字を除いたハッシュ値、あるいは入力がNULLの場合は空の文字列を返す。
   */
  private getHash(urlString: string | null): string {
    if (!urlString) return "";

    const hashIndex: number = urlString.indexOf("#");
    if (hashIndex < 0) return "";

    const fragment = urlString.substring(hashIndex);
    const id = fragment.split('?')[0];
    return id.substring(1);
  }

}
