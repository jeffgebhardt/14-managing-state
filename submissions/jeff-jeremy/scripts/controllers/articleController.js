(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadById = function(ctx, next) {
    //This method performs a SQL query that selects a specified id within the id column and returns
    // that articles ID and sets the article with that id to ctx.articles.
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByAuthor = function(ctx, next) {
    //This method performs a SQL query that selects a specified author within the authors column and returns
    // that articles author and sets the article(s) with that author to ctx.articles.
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByCategory = function(ctx, next) {
    //This method performs a SQL query that selects a specified category within the categories column and returns
    // the articles with that category.
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadAll = function(ctx, next) {
    //Checks to see if Article.all array has length, if so it sets the current context with a property
    // of articles to the Article.all array. If not it runs the Article.fetchAll method which pulls
    //from the SQL database which holds all of our articles. And then it takes those rows(articles)
    //and pushes those rows as Article objects to the Article.all array.
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
