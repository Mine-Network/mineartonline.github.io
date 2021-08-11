function article_get() {
    var articleId = getParam("article");
    if (articleId == null) {
        articleListDisplay();
        console.log("ID NULL");
        return;
    } else {
        article_load(articleId);
    }
}

function article_load(articleId) {
    var articleMain = true;
    $.ajax({
        url: "./assets/article/" + articleId + ".html",
        cache: false,
        async: false,
        dataType: 'html',
        success: function(html){
            html = html.replace(/\{\$root\}/g, "./assets/image/article/" + articleId + "/");
            document.write(html);
            var page_title = document.getElementsByTagName("minenetwork-title");
            if (page_title.length != 0) {
                var title_changed = page_title[0].textContent + " | Mine Art Online―マインアートオンライン";
                document.title = title_changed
                $("meta[property='og:title']").attr('content', title_changed);
                $("meta[property='og:site_name']").attr('content', title_changed);

            } else {
                console.log("NO TITLE");
            }
            articleMain = true;
            console.log("PAGE LOAD");
        },
        error: function(data) {
            articleMain = false;
            console.log("PAGE NOT FOUND");
        }
    });

    if (articleMain) {
        articleMainDisplay();
    } else {
        articleListDisplay();
    }
}

function articleMainDisplay() {
    $(function(){
        $("#article_area").show();
        $("#list_article_area").hide();
        console.log("articleMainDisplay");
    });
}

function articleListDisplay() {
    $(function(){
        $("#article_area").remove();
        $("#list_article_area").show();
        console.log("articleListDisplay");
    });
}