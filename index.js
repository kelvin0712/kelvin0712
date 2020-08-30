const axios = require("axios");
const fs = require("fs");

const template = fs.readFileSync(`${__dirname}/template.md`, "utf-8");

fs.writeFileSync("README.md", template);

const readme = fs.readFileSync(`${__dirname}/README.md`, "utf-8");

const getQuote = async () => {
  try {
    const { data } = await axios.get("https://quotes.rest/qod?language=en");

    const quote = data.contents.quotes[0].quote;
    const author = data.contents.quotes[0].author;

    return {
      quote,
      author,
    };
  } catch (err) {
    console.error(err.message);
    return {};
  }
};

const replaceReadme = async () => {
  const { quote, author } = await getQuote();

  if (!quote) return;

  let newReadme = readme.replace(/{%QUOTE%}/g, quote);
  newReadme = newReadme.replace(/{%AUTHOR%}/g, author);

  fs.writeFileSync("README.md", newReadme);
};

replaceReadme();
