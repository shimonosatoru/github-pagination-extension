$(function() {

    'use strict';

    // commitのページであることを確認
    if (!location.href.match(/github\.com\/(.*)\/(.*)\/commits/)) {
        return false;
    }

    /**
     * ページステータス
     * 今がどういうページにいるのか判別するためのもの
     * 0: 最初のページ
     * 1: 最後のページ
     * 2: 2以降で最後以外のページ
     */
    let pageStatus = 0;

    // ページネーションのリンク要素
    const pageBtnElem = $('.paginate-container a.btn');
    const pageDisabledElem = $('.paginate-container button.btn');

    // pageStatusの判定
    if (pageDisabledElem.text() == 'Newer') {
        pageStatus = 0;
    } else if (pageDisabledElem.text() == 'Older') {
        pageStatus = 1;
    } else {
        pageStatus = 2;
    }

    switch (pageStatus) {
        case 0:
            // コミット分のページナンバー, 現在のページナンバーを定義
            const commitNum = 34;
            const pageBtnElem = 1;
            break;
        case 1:
            const index = pageElem.attr('href').indexOf('+');
            const commitNum = href.slice(index + 1);
            const pageBtnElem = (commitNum - 34) / 35 + 1;
            break;
        case 2:
            // TODO: コミット数が取得できたら設定する
            const maxCommitForTest = 5000;
            const commitNum = maxCommitForTest - maxCommitForTest % 35;
            const pageBtnElem = (maxCommitForTest - 34) / 35 + 1;
            break;
        default:
            break;
    }
    
    // renderする
    renderPaginate(pageStatus, commitNum, pageBtnElem);

    function renderPaginate(pageStatus, commitNum, pageBtnElem) {
        
    }
});