$(function() {

    'use strict';

    // commitのページであることを確認
    if (!location.href.match(/github\.com\/(.*)\/(.*)\/commits/)) {
        return false;
    }

    // 総コミット数の取得
    function getTotalCommit() {
        const url = location.pathname.match(/\/(.*)\/(.*)\//)[1];
        return $.ajax({
            url: 'https://github.com/' + url,
            dataType: 'html',
            type: 'GET'
        });
    }
    
    getTotalCommit().done(function(result) {

        const totalCommitNumStr = $(result)
                    .find('.commits .num')
                    .text()
                    .trim()
                    .replace(/,/, '');
        const totalCommitNum = parseInt(totalCommitNumStr, 10);

        // コミット分のページナンバー, 現在のページナンバーを定義
        // paginateをrenderする
        let pageNum;
        switch (pageStatus) {
            case 0:
                pageNum = 1;
                break;
            case 1:
                pageNum = (totalCommitNum - totalCommitNum % 35) / 35;
                break;
            case 2:
                const index = location.href.indexOf('+');
                const commitNum = parseInt(location.href.slice(index + 1), 10);
                if (location.href.match(/\?(.*)=/)[1] == 'before') {
                    pageNum = (commitNum - 1) / 35 - 1;
                } else if (location.href.match(/\?(.*)=/)[1] == 'after') {
                    pageNum = (commitNum - 34) / 35 + 1;
                }
                break;
            default:
                break;
        }

        renderPaginate(pageStatus, pageNum, totalCommitNum);
        
    }).fail(function(result) {
    });

    /**
     * ページステータス
     * 今がどういうページにいるのか判別するためのもの
     * 0: 最初のページ
     * 1: 最後のページ
     * 2: 中間ページ
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

    function renderPaginate(pageStatus, pageNum, totalCommitNum) {

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
                        .replace(/\+(\d+)/, '+' + (34 + 35 * (i - 1)))
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
            const newerHTML = pageBtnElem.prop('outerHTML');

            // ボタンのHTMLを詰め込んでく
            let pageElementBuilder = '';
            for (let i = 0; i < 5; i++) {
                
                // currentであればリンクなしで追加
                if (i === 0) {
                    pageElementBuilder += '<em class="current" data-total-pages="' + pageNum + '">' + pageNum + '</em>';
                } else {
                    let commitNum = (totalCommitNum - totalCommitNum % 35 + 1) - (35 * (i - 1));
                    pageElementBuilder = newerHTML
                        .replace(/\+(\d+)/, '+' + commitNum)
                        .replace(/>Newer</, '>' + (pageNum - i) + '<')
                        + pageElementBuilder;
                }
            }
            

            // ボタンを作成
            pageGroupElem.html(pageElementBuilder);

            // currentの設定
            pageGroupElem.find('em').css(currentProperty);

            // NewerとOlderを挿入する
            pageGroupElem.prepend(newerHTML);
            pageGroupElem.append('<button class="btn btn-outline BtnGroup-item" disabled="disabled">Older</button>');
            
        } else if (pageStatus === 2) {

            // NewerとOlderのHTMLを保存しておく
            const newerHTML = pageBtnElem.first().prop('outerHTML');
            const olderHTML = pageBtnElem.first().next().prop('outerHTML');

            // ボタンのHTMLを詰め込んでく
            let pageElementBuilder = '';
            for (let i = 0; i < 5; i++) {

                if ((pageNum + i + 1) > ((totalCommitNum - totalCommitNum % 35) / 35)) { break; }
                
                let commitNum = pageNum * 35 + 35 * (i + 1);
                pageElementBuilder += olderHTML
                    .replace(/\+(\d+)/, '+' + commitNum)
                    .replace(/>Older</, '>' + (pageNum + i + 1) + '<');
                console.log(pageElementBuilder);
                console.log(pageNum);
            }
            for (let i = 0; i < 5; i++) {

                if ((pageNum - i) < 1) { break; }
                
                // currentであればリンクなしで追加
                if (i === 0) {
                    pageElementBuilder = '<em class="current" data-total-pages="' + pageNum + '">' + pageNum + '</em>' + pageElementBuilder;
                } else {
                    let commitNum = (pageNum * 35 + 1) - 35 * (i - 1);
                    pageElementBuilder = newerHTML
                        .replace(/\+(\d+)/, '+' + commitNum)
                        .replace(/>Newer</, '>' + (pageNum - i) + '<')
                        + pageElementBuilder;
                }
                console.log(pageElementBuilder);
            }

            // ボタンを作成
            pageGroupElem.html(pageElementBuilder);

            // currentの設定
            pageGroupElem.find('em').css(currentProperty);

            // NewerとOlderを挿入する
            pageGroupElem.prepend(newerHTML);
            pageGroupElem.append(olderHTML);

        }
    }
});