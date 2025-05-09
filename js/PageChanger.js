export class PageChanger {
    /**
     * 显示指定页面
     * @function
     * @param {string} pageId - 要显示的页面的ID
     */
    static showPage(pageId) {
        // 隐藏所有页面
        $('.page').hide();
        // 显示指定页面
        $(`#${pageId}`).show();
    }
}
PageChanger.currentPage = null;
//# sourceMappingURL=PageChanger.js.map