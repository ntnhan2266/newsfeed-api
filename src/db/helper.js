const axios = require("axios");

const addSource = (db, source) => {
  // Get data from soure and insert into database
  return new Promise((resolve, reject) => {
    axios
    .get(source)
    .then(response => {
      if (response.data && response.data.status == "ok") {
        db.serialize(() => {
          var stmt = db.prepare(
            "INSERT INTO newsfeeds VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
          );
          const articles = response.data.articles;
          for (let i = 0; i < articles.length; i++) {
            const item = articles[i];
            stmt.run(
              item.source.id,
              item.source.name,
              item.author,
              item.title,
              item.description,
              item.url,
              item.urlToImage,
              item.publishedAt,
              item.content,
              source
            );
          }
          stmt.finalize();
          resolve(true);
        });
      }
    })
    .catch(error => {
      console.log(error);
      reject(error);
    });
  });
};

module.exports = addSource;
