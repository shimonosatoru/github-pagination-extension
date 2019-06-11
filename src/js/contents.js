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
            const pageNum = 1;
            renderPaginate(0, 34, 1);
            break;
        case 1:
            // TODO: コミット数が取得できたら設定する
            const maxCommitForTest = 5000;
            commitNum = maxCommitForTest - maxCommitForTest % 35;
            pageNum = (maxCommitForTest - 34) / 35 + 1;
            renderPaginate(1, commitNum, pageNum);
            break;
        case 2:
            const index = pageElem.attr('href').indexOf('+');
            commitNum = parseInt(href.slice(index + 1), 10);
            pageNum = (commitNum - 34) / 35 + 1;
            renderPaginate(2, commitNum, pageNum);
            break;
        default:
            break;
    }

    function renderPaginate(pageStatus, commitNum, pageNum) {

        if (pageStatus === 0) {

            // OlderのHTMLを保存しておく
            const olderHTML = pageBtnElem.prop('outerHTML');

            // ボタンのHTMLを詰め込んでく
            let pageElementBuilder = '';
            for (let i = 0; i < 5; i++) {
                
                // currentであればリンクなしで追加
                if (i === 0) {
                    pageElementBuilder += '<em class="current" data-total-pages="9">1</em>';
                } else {
                    pageElementBuilder += olderHTML
                        .replace(/\+(\d+)/, '+' + (commitNum + 35 * (i - 1)))
                        .replace(/>Older</, '>' + (i + pageNum) + '<');
                }
            }

            // ボタンを作成
            pageGroupElem.html(pageElementBuilder);

            // currentの設定
            pageGroupElem.find('em').css(currentProperty);

            // NewerとOlderを挿入する
            pageGroupElem.prepend('<button class="btn btn-outline BtnGroup-item" disabled="disabled">Newer</button>');
            pageGroupElem.append(olderHTML);


        } else if (pageStatus === 1) {

            // NewerのHTMLを保存しておく
            const newerHTML = pageBtnElem;

            // NewerとOlderを挿入する
            pageGroupElem.prepend(newerHTML);
            pageGroupElem.append('<button class="btn btn-outline BtnGroup-item" disabled="disabled">Older</button>');
            
        } else if (pageStatus === 2) {

            // NewerとOlderのHTMLを保存しておく
            const newerHTML = pageBtnElem.first();
            const olderHTML = pageBtnElem.first().next();

            // NewerとOlderを挿入する
            pageGroupElem.prepend(newerHTML);
            pageGroupElem.append(olderHTML);

        }
    }
});