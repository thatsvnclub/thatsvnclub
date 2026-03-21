import { feedPlugin } from "@11ty/eleventy-plugin-rss";

export default function (eleventyConfig) {
	eleventyConfig.setInputDirectory('src');
	eleventyConfig.setOutputDirectory('dist');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/css');
  eleventyConfig.addPassthroughCopy('src/css/fonts');
  eleventyConfig.addPassthroughCopy('src/posts');
  eleventyConfig.addFilter("itemLimit", function(array, maximum) {
    return array.slice(0, maximum);
});
  eleventyConfig.addFilter("filterTags", (items) => {
    const newTags = [];
    for (let i of items) {
		if (i[0] != 'post' && i[0] != 'posts' && i[0] != 'all') {
        newTags.push(i);
      }
    }
    return newTags;
  });
  eleventyConfig.addFilter("filterPostTags", (items) => {
	const newTags = [];
	for (let i of items) {
		console.log(i);
		if (i != "post") {
			newTags.push(i);
		}
	}
	return newTags.join(" ");
  });
  eleventyConfig.addFilter("postDate", (dateObj) => {
    // Can use toLocaleString the same way we were before
    return dateObj.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  });
eleventyConfig.addFilter('sortObjectByKey', (collection) => {
  const entries = Object.entries(collection);
  const toReturn = entries.sort((entry1, entry2) => {
    if (entry1[0] <= entry2[0]) return -1;
    else return 1;
  });
  return toReturn;
});

	eleventyConfig.addPlugin(feedPlugin, {
		type: "atom", // or "rss", "json"
		outputPath: "/feed.xml",
		collection: {
			name: "post", // iterate over `collections.posts`
			limit: 50,     // 0 means no limit
		},
		metadata: {
			language: "en",
			title: "that's vn club!",
			subtitle: "an evil visual novel doujin circle",
			base: "https://thatsvn.club/",
			author: {
				name: "that's vn club!",
				email: "", // Optional
			}
		}
	});

}
export const config = {
	markdownTemplateEngine: 'njk',
	htmlTemplateEngine: 'njk',
};
