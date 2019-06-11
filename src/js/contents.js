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
            const olderHTML = pageBtnElem;

            // ボタンのHTMLを詰め込んでく
            let pageElementBuilder = '';
            for (let i = 0; i < 5; i++) {
                
                // currentであればリンクなしで追加
                if (i === 0) {
                    pageElementBuilder += '<em class="current" data-total-pages="9">1</em>';
                } else {
                    let paginateHTML = '<a rel="nofollow" ' +
                                       'class="btn btn-outline BtnGroup-item" ' +
                                       'href="https://github.com/team-lab/mynavibaito-main/commits/master?after=edbf7f630616206b2cf9cff8db2f5f4d0986630f+' +
                                       (commitNum + 35 * (i + 1)) + '">' + (i + 1) + '</a>'; // 35ずつ足していく
                    pageElementBuilder += paginateHTML;
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

            // NewerとOlderを挿入する
            buildSiblingsButton(true, false, pageNum);
            
        } else if (pageStatus === 2) {

            // NewerとOlderのHTMLを保存しておく

            // NewerとOlderを挿入する
            buildSiblingsButton(true, true, pageNum);

        }
    }

    /**
     * buildSiblingsButton
     * NewerまたはOlderが押せるか押せないかの2つを引数にとる
     * @param {*} hasNewer 
     * @param {*} hasOlder 
     */
    function buildSiblingsButton(hasNewer, hasOlder, pageNum) {

        if (hasNewer) {
            pageGroupElem.prepend('<a rel="nofollow" class="btn btn-outline BtnGroup-item btn-newer" ' +
                                  'href="https://github.com/ruby/ruby/commits/trunk?after=140b8117bd3c32cb9d0b144937b90f0178a00b0e+' +
                                  (pageNum - 1) * 35 + '">Newer</a>');
                                  href="https://github.com/ruby/ruby/commits/trunk?before=140b8117bd3c32cb9d0b144937b90f0178a00b0e+35"
        } else {
            pageGroupElem.prepend('<button class="btn btn-outline BtnGroup-item" disabled="disabled">Newer</button>')
        }

        if (hasOlder) {
            pageGroupElem.append('<a rel="nofollow" class="btn btn-outline BtnGroup-item btn-older" href="https://github.com/ruby/ruby/commits/trunk?after=140b8117bd3c32cb9d0b144937b90f0178a00b0e+69">Older</a>');
        } else {
            pageGroupElem.append('<button class="btn btn-outline BtnGroup-item" disabled="disabled">Older</button>')
        }
    }
});