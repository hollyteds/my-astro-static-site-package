/* スモールデバイス用対策モジュール */
import switchViewport from "@modules/fixViewport";

/* メニューボタンの発火モジュール */
import SetMenuButton from "@modules/SetMenuButton"; 

/* スムーススクロール */
import SmoothScroll from "@modules/SmoothScroll";

// import ScrollHint from 'scroll-hint';

import addAriaHiddenToBrTags from '@modules/addAriaHiddenToBrTags';

// import ScrollObserver from "@modules/ScrollObserver"; // スクロール時の固定フッター設定用インスタンス

// Googleフォントの指定 (Array)
const WebFont: string[] = ['Zen+Maru+Gothic:500'];
 
// 最小ウインドウ幅
const minWindowWidth: number = 375; 

const setMenuButton = new SetMenuButton;

addAriaHiddenToBrTags();

// イベント **********************************************************

// ぺージロード時に処理
document.addEventListener("DOMContentLoaded", () => {
	switchViewport(minWindowWidth);
	new SmoothScroll();
	// new ScrollHint('.js-scrollable', {
	// 	i18n: {
	// 		scrollable: 'スクロールできます'
	// 	}
	// });
	// const observedElement = document.getElementById('scroll-observer') as Element;
	// new ScrollObserver(observedElement, 'is-show-button', {
	// 	root: null,
	// 	rootMargin: '-100% 0% 0%',
	// 	threshold: 0,
	// });
});

document.addEventListener("load", () => {
	setMenuPosition();
	setNavHeight();
});

// リサイズ時に処理
window.addEventListener('resize', () => {
	switchViewport(minWindowWidth);
	setMenuPosition();
	setNavHeight();
}, false);


// 関数 **********************************************************

const setMenuPosition = () => {
	const screenWidth = window.innerWidth;
	const targetElement: HTMLElement | null = screenWidth >= 1024
		?	document.getElementById('nav') : document.getElementById('header');

	document.documentElement.style.setProperty('--header-height', `${targetElement?.clientHeight}px`);
}

const setNavHeight = () => {
	const targetElement: HTMLElement | null = document.getElementById('nav');

	document.documentElement.style.setProperty('--nav-height', `${targetElement?.clientHeight}px`);
}