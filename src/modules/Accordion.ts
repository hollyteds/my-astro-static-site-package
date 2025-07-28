/**
 * アコーディオンUIを提供するクラス。
 * 指定されたラッパー内にあるボタンとパネルを取得し、
 * 各要素にWAI-ARIA属性を付与して開閉を制御する。
 */
export class Accordion {
  private accordionButtons: HTMLElement[];
  private accordionPanels: HTMLElement[];

  /**
   * コンストラクタ
   * @param params - アコーディオンの設定パラメータ
   *   wrapper: アコーディオンのラッパー要素のセレクタ
   *   button: アコーディオンボタンのセレクタ (デフォルト: ".accordion-button")
   *   panel: アコーディオンパネルのセレクタ (デフォルト: ".accordion-panel")
   */
  constructor(params: { wrapper: string; button?: string; panel?: string }) {
    // wrapperに一致するすべてのラッパー要素を取得
    const wrapperElements = this.getElements(params.wrapper, "Wrapper elements") as NodeListOf<HTMLElement>;
    this.accordionButtons = [];
    this.accordionPanels = [];

    // 各ラッパー要素の中からボタンとパネルを取得
    wrapperElements.forEach((wrapper, i) => {
      const button = wrapper.querySelector(params.button || ".accordion-button") as HTMLElement;
      const panel = wrapper.querySelector(params.panel || ".accordion-panel") as HTMLElement;

      if (button && panel) {
        this.accordionButtons.push(button);
        this.accordionPanels.push(panel);

        // WAI-ARIA属性を追加
        this.setAriaAttributes(button, panel, i);

        // パネル内の要素が非表示の際にフォーカスされないようにする
        this.setFocusableElements(panel, false);
      } else {
        console.warn(`Accordion button or panel not found in wrapper: ${wrapper}`);
      }
    });

    this.onPanelToggle = this.onPanelToggle.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.initialize();
  }

  /**
   * 指定されたセレクタに基づいて要素を取得し、要素が見つからない場合は警告を出す
   * @param selector - CSSセレクタ
   * @param elementName - ログ出力時に表示する要素名
   */
  private getElements(selector: string, elementName: string): NodeListOf<HTMLElement> {
    const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
    if (!elements.length) {
      console.warn(`${elementName} not found for selector: ${selector}`);
    }
    return elements;
  }

  /**
   * パネル内のすべてのフォーカス可能な要素のフォーカス制御を設定する
   * @param panel - 対象のアコーディオンパネル
   * @param isFocusable - true: フォーカス可能にする, false: 不可にする
   */
  private setFocusableElements(panel: HTMLElement, isFocusable: boolean): void {
    const focusableElements = panel.querySelectorAll("a, button, input, textarea, select, [tabindex]") as NodeListOf<HTMLElement>;
    focusableElements.forEach((element: HTMLElement) => {
      element.setAttribute("tabindex", isFocusable ? "0" : "-1");
    });
  }

  /**
   * アコーディオンパネルを閉じる
   * @param panel - 対象のアコーディオンパネル
   * @param button - 対応するアコーディオンボタン
   */
  private closePanel(panel: HTMLElement, button: HTMLElement): void {
    button.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
    this.setFocusableElements(panel, false); // フォーカスできないように設定
  }

  /**
   * アコーディオンパネルを開く
   * @param panel - 対象のアコーディオンパネル
   * @param button - 対応するアコーディオンボタン
   */
  private openPanel(panel: HTMLElement, button: HTMLElement): void {
    button.setAttribute("aria-expanded", "true");
    panel.setAttribute("aria-hidden", "false");
    this.setFocusableElements(panel, true); // フォーカスできるように設定
  }

  /**
   * 全てのアコーディオンパネルを閉じる
   */
  public closeAllPanels(): void {
    this.accordionPanels.forEach((panel, index) => {
      const button = this.accordionButtons[index];
      this.closePanel(panel, button);
    });
  }

  /**
   * クリックされたアコーディオンパネルを開閉します。
   * @param event - クリックイベント
   */
  private onPanelToggle(event: Event): void {
    const button = event.currentTarget as HTMLElement;
    const index = this.accordionButtons.indexOf(button);
    const panel = this.accordionPanels[index];

    if (!panel) {
      console.warn(`Accordion panel not found for button at index ${index}`);
      return; // 処理をスキップ
    }

    if (button.getAttribute("aria-expanded") === "true") {
      this.closePanel(panel, button);
    } else {
      this.openPanel(panel, button);
    }
  }

  /**
   * キーボード操作をサポート (Enterキー、Spaceキー)
   * @param event - キーボードイベント
   */
  private onKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.onPanelToggle(event);
    }
  }

  /**
   * アコーディオンを初期化します。
   */
  private initialize(): void {
    // ボタンにクリックイベントとキーボードイベントを追加
    this.accordionButtons.forEach((button) => {
      button.addEventListener("click", this.onPanelToggle);
      button.addEventListener("keydown", this.onKeyDown);
    });
  }

  /**
   * 指定された属性のペアを対象の要素に一括で設定します。
   *
   * @param target - 属性を設定するHTML要素
   * @param attributes - 設定する属性の配列。各要素は [属性名, 値] の形式。
   */
  private setAttributes(target: HTMLElement, attributes: [string, string][]): void {
    attributes.forEach(([key, value]) => {
      target.setAttribute(key, value);
    });
  }

  /**
   * アコーディオンボタンおよびパネルに必要なWAI-ARIA属性を設定します。
   *
   * @param button - 対象のアコーディオンボタン
   * @param panel - 対象のアコーディオンパネル
   * @param index - 各ボタン・パネルのインデックス番号（一意なIDや参照の生成に使用）
   */
  private setAriaAttributes(button: HTMLElement, panel: HTMLElement, index: number): void {
    this.setAttributes(button, [
      ["role", "button"],
      ["aria-controls", `accordion-panel-${index}`],
      ["aria-expanded", "false"]
    ]);
    this.setAttributes(panel, [
      ["id", `accordion-panel-${index}`],
      ["role", "region"],
      ["aria-labelledby", `accordion-button-${index}`],
      ["aria-hidden", "true"]
    ]);
  }
}

