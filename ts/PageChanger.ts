import { Page } from './pages/Page.js';
import { DebugPage } from './pages/DebugPage.js';
import { HabitPage } from './pages/HabitPage.js';
import { PlanPage } from './pages/PlanPage.js';
import { StatsPage } from './pages/StatsPage.js';
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
    static pageInstances: { [key in PageId]?: Page } = {};

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


        // 获取当前页面，出栈
        const currentPage = PageChanger.currentPage;
        if (currentPage) {
            currentPage.onLeave();
        }

        const appData: AppData = SaveManager.loadAppData();

        if (!PageChanger.pageInstances[pageId]) {
            switch (pageId) {
                case PageId.Habit:
                    PageChanger.pageInstances[pageId] = new HabitPage();
                    break;
                case PageId.Debug:
                    PageChanger.pageInstances[pageId] = new DebugPage();
                    break;
                case PageId.Plan:
                    PageChanger.pageInstances[pageId] = new PlanPage();
                    break;
                case PageId.Stats:
                    PageChanger.pageInstances[pageId] = new StatsPage();
                    break;
            }
        }

        const pageInstance = PageChanger.pageInstances[pageId];
        if (pageInstance) {
            pageInstance.onEnter(appData);
            PageChanger.currentPage = pageInstance;
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