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
    const pageGroupElem = $('.paginate-container .BtnGroup');
    const pageBtnElem = $('.paginate-container a.btn');
    const pageDisabledElem = $('.paginate-container button.btn');

    // current style
    const currentProperty = {
        'border': '1px solid #e1e4e8',
        'cursor': 'pointer',
        'float': 'left',
        'font-size': '13px',
        'font-style': 'normal',
        'font-weight': '600',
        'margin-left': '-1px',
        'padding': '6.5px 12px',
        'position': 'relative',
        'user-select': 'none',
        'vertical-align': 'middle',
        'white-space': 'nowrap',
        'background-color': '#0366d6',
        'border-color': '#0366d6',
        'color': '#fff',
        'z-index': '3'
    };

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