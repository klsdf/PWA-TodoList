import { Page } from './pages/Page.js';
import { DebugPage } from './pages/DebugPage.js';
import { HabitPage } from './pages/HabitPage.js';
import { AppData } from './AppData.js';
import { SaveManager } from './SaveManager.js';


export enum PageId {
    Habit = 'habit-page',
    Plan = 'plan-page',
    Stats = 'stats-page',
    Debug = 'debug-page'
}

/**
 * 页面切换器，用于切换页面
 * @class
 * @static
 * @method showPage
 * @method changePage
 * @method init
 */
export class PageChanger {

    static currentPage: Page | null = null;
    /** 
     * 显示指定页面
     * @function
     * @param {string} pageId - 要显示的页面的ID
     */
    static showPage(pageId: PageId) {
        // 隐藏所有页面
        $('.page').hide();
        // 显示指定页面
        $(`#${pageId}`).show();


        const appData: AppData = SaveManager.loadAppData();

        switch (pageId) {
            case PageId.Habit:
                HabitPage.onEnter(appData);
                break;
            case PageId.Debug:
                DebugPage.onEnter(appData);
                break;
        }
    }

    static changePage(pageId: string) {
        // 隐藏所有页面
        $('.page').hide();
        // 显示指定页面
        $(`#${pageId}`).show();
    }
    static init() {
        // 修改按钮的事件处理程序以使用PageChanger类
        $('#habit-button').on('click', () => PageChanger.showPage(PageId.Habit));
        $('#plan-button').on('click', () => PageChanger.showPage(PageId.Plan));
        $('#stats-button').on('click', () => PageChanger.showPage(PageId.Stats));
        $('#debug-button').on('click', () => { PageChanger.showPage(PageId.Debug); });
    }
}